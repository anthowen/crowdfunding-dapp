import { BigNumber, constants } from "ethers";
import { Address, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { eventContract, usdtContract } from "../utils/contracts";

function useTokenApprove(token: string, amount: BigNumber) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: token as Address,
    abi: usdtContract.abi,
    functionName: "approve",
    args: [eventContract.address, amount],
    enabled: token !== constants.AddressZero && amount && amount.gt(BigNumber.from(0))
  });
  const { data, write: approve, isError, error } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    approve,
    isLoading,
    isSuccess,
    isError: isPrepareError || isError,
    error: (prepareError || error)?.message
  };
}

export default useTokenApprove;
