import { BigNumber, constants } from 'ethers';
import { useMemo } from 'react';
import { Address, useAccount, useBalance, useContractReads } from 'wagmi';
import { usdcContract, usdtContract } from '../utils/contracts';

function useTokenBalances(account?: Address) {
  const { address } = useAccount();
  const accountToFetch = account || address;
  const { data: maticBalance, isLoading: maticBalanceLoading, isError: maticBalanceError } = useBalance({
    address: accountToFetch,
    watch: true,
  })
  
  const { data: balances, isLoading, isError } = useContractReads({
    contracts: accountToFetch ? [
      {
        ...usdtContract,
        functionName: 'balanceOf',
        args: [accountToFetch]
      },
      {
        ...usdcContract,
        functionName: 'balanceOf',
        args: [accountToFetch]
      }
    ] : [],
    watch: true,
  });

  const tokenBalances = useMemo(() => {
    return {
      [constants.AddressZero as Address]: maticBalance?.value,
      [usdtContract.address]: balances?.[0],
      [usdcContract.address]: balances?.[1],
    } as Record<Address, BigNumber | undefined>
  }, [maticBalance, balances]);

  return {
    tokenBalances,
    isLoading: maticBalanceLoading || isLoading,
    isError: maticBalanceError || isError,
  };
}

export default useTokenBalances;
