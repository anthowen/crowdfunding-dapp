import { DEPLOY_BLOCK } from "contracts";
import { BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { eventContract } from "../../utils/contracts";
import { convertFromHexString } from "../../utils/string";
import { getRpcProvider } from './../../utils/rpc';

const FILTER_BLOCK_STEP = 3000;
const topicIds: Record<string, string> = {
  deposit: ethers.utils.id("Deposit(address,address,uint256)"),
  withdraw: ethers.utils.id("Withdraw(address,uint256)"),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { events } = req.query;
  const eventType = events as string;
  if (!eventType || !topicIds[eventType]) {
    return res.status(403).json({ message: 'Unidentified event type'});
  }

  try {
    const rpcProvider = getRpcProvider(process.env.RPC_URL);
    const endBlock = await rpcProvider.getBlockNumber();
    const results = [];

    for (
      let block = DEPLOY_BLOCK;
      block <= endBlock;
      block += FILTER_BLOCK_STEP
    ) {
      let toBlock = block + FILTER_BLOCK_STEP;
      if (toBlock > endBlock) toBlock = endBlock;

      const logs = await rpcProvider.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: eventContract.address,
        topics: [topicIds[eventType]]
      });

      results.push(...logs.filter(log => !log.removed).map(log => (
        eventType === 'deposit' ? {
          hash: log.transactionHash,
          blockNumber: log.blockNumber,
          account: convertFromHexString(log.topics[1]),
          token: convertFromHexString(log.topics[2]),
          amount: BigNumber.from(
            ethers.utils.hexStripZeros(log.topics[3]),
          ).toString()
        } : {
          hash: log.transactionHash,
          blockNumber: log.blockNumber,
          token: convertFromHexString(log.topics[1]),
          amount: BigNumber.from(
            ethers.utils.hexStripZeros(log.topics[2]),
          ).toString()
        }
      )));
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Get event error', eventType, error);
    return res.json({});
  }
};

export default handler;
