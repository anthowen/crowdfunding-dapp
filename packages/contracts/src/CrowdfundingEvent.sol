// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrowdfundingEvent is Ownable {
  string public title;
  mapping(address => bool) public tokenAllowlist;

  error InvalidToken();
  error NotEnoughAmount();
  error NotEnoughBalanceOrApproval();
  error NotAllowedToken();
  error WithdrawFail();

  event Deposit(address indexed user, address indexed token, uint256 indexed amount);
  event Withdraw(address indexed token, uint256 indexed amount);
  event AllowToken(address indexed token, bool indexed allowed);

  /**
   * @dev Deposit tokens in the form of native token or ERC20 token. Emits Deposit event for successful deposit
   * @param _token ERC20 token address
   * @param _amount ERC20 token amount
   * @notice When _token is a zero address, it means sender only deposits native token. Otherwise, it will deposit the specified ERC20 token amount. When _token is not a zero address and msg.value is not empty, it will deposit both native and ERC20 tokens
   */
  function deposit(address _token, uint256 _amount) external payable {
    if (msg.value > 0) {
      emit Deposit(msg.sender, address(0), msg.value);
    }

    if (_token != address(0)) {
      _depositERC20(_token, _amount);
    }
  }

  /**
   * @dev Withdraw the balance of specified token (ERC20 or native token) to the contract owner
   * @notice Only callable by the contract owner
   */
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

  /**
   * @dev Allow specific ERC20 token to be deposited.
   * @param _token ERC20 token address
   * @param _allow True if to allow the token, otherwise false
   */
  function allowERC20(address _token, bool _allow) external onlyOwner {
    tokenAllowlist[_token] = _allow;

    emit AllowToken(_token, _allow);
  }

  /**
   * @dev Set campaign title
   * @param _title Title
   */
  function setCampaignTitle(string memory _title) external onlyOwner {
    title = _title;
  }

  /**
   * @dev Internal function to only deposit ERC20 token. Token should be allowed first.
   * @param _token ERC20 token address
   * @param _amount Amount of token to deposit
   */
  function _depositERC20(address _token, uint256 _amount) internal {
    if (_token == address(0)) {
      revert InvalidToken();
    }

    if (tokenAllowlist[_token] == false) {
      revert NotAllowedToken();
    }

    IERC20 token = IERC20(_token);
    bool success = token.transferFrom(msg.sender, address(this), _amount);

    if (!success) {
      revert NotEnoughBalanceOrApproval();
    }

    emit Deposit(msg.sender, _token, _amount);
  }

  // Fallback function must be declared as external.
  fallback() external payable {
    // Emit Deposit event, so treat a direct transfer as deposit as well
    emit Deposit(msg.sender, address(0), msg.value);
  }

  // Receive is a variant of fallback that is triggered when msg.data is empty
  receive() external payable {
    emit Deposit(msg.sender, address(0), msg.value);
  }

}
