import { ethers } from 'ethers';

export const getRpcProvider = (url?: string) => {
  if (!url) {
    throw new Error('Empty RPC url provided');
  }
  
  return new ethers.providers.StaticJsonRpcProvider(url);
};
