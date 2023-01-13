import { ADDRESSES, ABIS } from 'contracts'
import { constants } from 'ethers';
import { Address } from 'wagmi';

export const eventContract = {
  address: ADDRESSES.CrowdfundingEvent as Address,
  abi: ABIS.CrowdfundingEvent,
} as const;

export const usdtContract = {
  address: ADDRESSES.MockUSDT as Address,
  abi: ABIS.MockUSDT,
} as const;

export const usdcContract = {
  address: ADDRESSES.MockUSDC as Address,
  abi: ABIS.MockUSDC,
} as const;

export const tokenAddresses = [
  constants.AddressZero, // native token; MATIC
  usdtContract.address,
  usdcContract.address
];
