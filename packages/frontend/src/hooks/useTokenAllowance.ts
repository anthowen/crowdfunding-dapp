import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { Address, useAccount, useContractReads } from 'wagmi';
import { eventContract, usdcContract, usdtContract } from '../utils/contracts';

function useTokenAllowance() {
  const { address } = useAccount();
  const { data, isLoading, isError } = useContractReads({
    contracts: address ? [
      {
        ...usdtContract,
        functionName: 'allowance',
        args: [address, eventContract.address]
      },
      {
        ...usdcContract,
        functionName: 'allowance',
        args: [address, eventContract.address]
      }
    ] : [],
    watch: true,
  });

  const allowances: Record<Address, BigNumber> = useMemo(() => {
    return {
      [usdtContract.address]: data?.[0],
      [usdcContract.address]: data?.[1],
    }
  }, [data]);

  return {
    allowances,
    isLoading,
    isError,
  };
}

export default useTokenAllowance;
