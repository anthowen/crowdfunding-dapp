// Export type definitions
export { CrowdfundingEvent } from './typechain/src/CrowdfundingEvent';
export { MockUSDC } from './typechain/src/MockUSDC';
export { MockUSDT } from './typechain/src/MockUSDT';

// Export deployed address and abi
import CrowdfundingEventJson from './deployments/mumbai/CrowdfundingEvent.json';
import MockUSDTJson from './deployments/mumbai/MockUSDT.json';
import MockUSDCJson from './deployments/mumbai/MockUSDT.json';

export const ADDRESSES = {
  CrowdfundingEvent: CrowdfundingEventJson.address,
  MockUSDT: MockUSDTJson.address,
  MOckUSDC: MockUSDCJson.address
};

export const ABIs = {
  CrowdfundingEvent: CrowdfundingEventJson.abi,
  MockUSDT: MockUSDTJson.abi,
  MOckUSDC: MockUSDCJson.abi
};

