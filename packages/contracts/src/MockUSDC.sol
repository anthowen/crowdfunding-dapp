// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract MockUSDC is ERC20Capped {
  constructor() ERC20("USD Coin", "USDC") ERC20Capped(10 ** 18) {
    _mint(msg.sender, 10 ** 17);
  }
}
