// Export deployed address and abi
import CrowdfundingEventJson from './deployments/mumbai/CrowdfundingEvent.json';
import MockUSDTJson from './deployments/mumbai/MockUSDT.json';
import MockUSDCJson from './deployments/mumbai/MockUSDC.json';

export const ADDRESSES = {
	CrowdfundingEvent: CrowdfundingEventJson.address,
	MockUSDT: MockUSDTJson.address,
	MockUSDC: MockUSDCJson.address,
} as const;

export const ABIS = {
	CrowdfundingEvent: CrowdfundingEventJson.abi,
	MockUSDT: MockUSDTJson.abi,
	MockUSDC: MockUSDCJson.abi,
} as const;

// export const DEPLOY_BLOCK = CrowdfundingEventJson.receipt.blockNumber;
export const DEPLOY_BLOCK = 39074180;
