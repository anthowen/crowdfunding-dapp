import { usdcContract } from '../utils/contracts';
import { BigNumber, constants } from "ethers";
import { Address, useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { usdtContract } from "../utils/contracts";
import { TOKEN_OPTIONS } from '../utils/config';

function useTokenMint(amount: BigNumber) {
  const { address } = useAccount();
  const {
    config: usdcConfig,
  } = usePrepareContractWrite({
    address: TOKEN_OPTIONS[1].value,
    abi: usdcContract.abi,
    functionName: "mint",
    args: [address, amount],
    enabled: !!address,
  });

  const {
    config: usdtConfig,
  } = usePrepareContractWrite({
    address: TOKEN_OPTIONS[2].value,
    abi: usdtContract.abi,
    functionName: "mint",
    args: [address, amount],
    enabled: !!address,
  });

  const { write: mintUsdc } = useContractWrite(usdcConfig);
  const { write: mintUsdt } = useContractWrite(usdtConfig);

  return {
    mintUsdc,
    mintUsdt
  };
}

export default useTokenMint;
