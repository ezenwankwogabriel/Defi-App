pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }

    function balance() public view returns (uint256) {
      return token.balanceOf(address(this));
    }

    function deposit(uint _amount) public {
      require(_amount > 0, "Amount cannot be 0");

      // transfer MyToken to smart contract
      token.safeTransferFrom(msg.sender, address(this), _amount);

      // mint FarmToken to msg sender
      _mint(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) public {
      // burn FarmToken from msg.sender
      _burn(msg.sender, _amount);

      // Transfer MyTokens from this smart contract to msg.sender
      token.safeTransfer(msg.sender, _amount);
    }
}