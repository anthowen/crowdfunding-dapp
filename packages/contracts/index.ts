// Export type definitions
export { CrowdfundingEvent } from './typechain/src/CrowdfundingEvent';
export { MockUSDC } from './typechain/src/MockUSDC';
export { MockUSDT } from './typechain/src/MockUSDT';

// Export deployed address and abi
import CrowdfundingEventJson from './deployments/mumbai/CrowdfundingEvent.json';
import MockUSDTJson from './deployments/mumbai/MockUSDT.json';
import MockUSDCJson from './deployments/mumbai/MockUSDC.json';

export const ADDRESSES = {
  CrowdfundingEvent: CrowdfundingEventJson.address,
  MockUSDT: MockUSDTJson.address,
  MockUSDC: MockUSDCJson.address
} as const;

export const ABIS = {
  CrowdfundingEvent: CrowdfundingEventJson.abi,
  MockUSDT: MockUSDTJson.abi,
  MockUSDC: MockUSDCJson.abi
} as const;

export const DEPLOY_BLOCK = CrowdfundingEventJson.receipt.blockNumber;
