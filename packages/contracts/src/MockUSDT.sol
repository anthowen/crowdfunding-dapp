// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract MockUSDT is ERC20Capped {
  constructor() ERC20("Tether", "USDT") ERC20Capped(1000000000 * (10 ** decimals())) {
    _mint(msg.sender, 20000000 * (10 ** decimals()));
  }

  function mint(address account, uint256 amount) external {
    _mint(account, amount);
  }
}
