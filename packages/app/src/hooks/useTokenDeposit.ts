import { BigNumber, constants } from "ethers";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { eventContract } from "../utils/contracts";

function useTokenDeposit(token: string, amount: BigNumber, allowed: boolean) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: eventContract.address,
    abi: eventContract.abi,
    functionName: "deposit",
    args: [token, amount],
    enabled: allowed && amount && amount.gt(BigNumber.from(0)),
    overrides: token === constants.AddressZero ? {
      value: amount
    } : undefined,
  });
  const { data, write: deposit, isError, error } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    deposit,
    isLoading,
    isSuccess,
    isError: isPrepareError || isError,
    error: (prepareError || error)?.message
  };
}

export default useTokenDeposit;
