import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts, getNamedAccounts} from 'hardhat';
import {CrowdfundingEvent} from '../typechain';
import {setupUsers} from './utils';

const setup = deployments.createFixture(async () => {
	await deployments.fixture('CrowdfundingEvent');
	const contracts = {
		CrowdfundingEvent: <CrowdfundingEvent>await ethers.getContract('CrowdfundingEvent'),
	};
	const { deployer } = await getNamedAccounts();
	const users = await setupUsers(await getUnnamedAccounts(), contracts);
	const deployers = await setupUsers([deployer], contracts);
	return {
		...contracts,
		users,
		deployer: deployers[0],
	};
});
describe('CrowdfundingEvent', function () {
	it('setCampaignTitle works', async function () {
		const {deployer, CrowdfundingEvent} = await setup();
		const testMessage = 'Hello World';
		await deployer.CrowdfundingEvent.setCampaignTitle(testMessage);

		expect(await CrowdfundingEvent.title()).to.eq(testMessage);
	});
});
