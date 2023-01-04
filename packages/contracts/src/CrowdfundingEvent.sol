// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrowdfundingEvent is Ownable {
  string public title;
  mapping(address => bool) public tokenWhitelist;

  error InvalidToken();
  error NotEnoughAmount();
  error NotEnoughBalanceOrApproval();
  error NotWhitelistedToken();
  error WithdrawFail();

  event Deposit(address indexed user, address indexed token, uint256 indexed amount);
  event Withdraw(address indexed token, uint256 indexed amount);
  event WhitelistToken(address indexed token, bool indexed whitelist);

  function depositERC20(address _token, uint256 _amount) external {
    if (_token == address(0)) {
      revert InvalidToken();
    }

    if (tokenWhitelist[_token] == false) {
      revert NotWhitelistedToken();
    }

    IERC20 token = IERC20(_token);
    bool success = token.transferFrom(msg.sender, address(this), _amount);

    if (!success) {
      revert NotEnoughBalanceOrApproval();
    }

    emit Deposit(msg.sender, _token, _amount);
  }

  function deposit() external payable {
    if (msg.value == 0) {
      revert NotEnoughAmount();
    }

    emit Deposit(msg.sender, address(0), msg.value);
  }

  function withdraw(address _token) external onlyOwner {
    bool sent;
    uint256 amount;
    if (_token == address(0)) {
      amount = address(this).balance;
      (sent, ) = payable(owner()).call{value: amount}("");
    } else {
      IERC20 token = IERC20(_token);
      amount = token.balanceOf(address(this));
      sent = token.transfer(owner(), amount);
    }

    if (!sent) {
      revert WithdrawFail();
    }

    emit Withdraw(_token, amount);
  }

  function whitelistERC20(address _token, bool _whitelist) external onlyOwner {
    tokenWhitelist[_token] = _whitelist;

    emit WhitelistToken(_token, _whitelist);
  }

  function setCampaignTitle(string memory _title) external onlyOwner {
    title = _title;
  }
}
