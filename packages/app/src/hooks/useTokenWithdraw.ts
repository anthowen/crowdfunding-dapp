import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { eventContract } from "../utils/contracts";

function useTokenWithdraw(token?: string) {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: eventContract.address,
    abi: eventContract.abi,
    functionName: "withdraw",
    args: [token],
    enabled: !!token,
  });
  const { data, write: withdraw, isError, error } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return {
    withdraw,
    isLoading,
    isSuccess,
    isError: isPrepareError || isError,
    error: (prepareError || error)?.message
  };
}

export default useTokenWithdraw;
