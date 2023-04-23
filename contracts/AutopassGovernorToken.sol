// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract AutopassGovernorToken is ERC20, ERC20Permit, ERC20Votes {
    mapping(address => bool) private _minted;
    uint256 private _totalMinted;
    uint256 public constant MINIAGT = 1 * 1e18;

    constructor()
        ERC20("AutopassGovernorToken", "AGT")
        ERC20Permit("AutopassGovernorToken")
    {}

    // The following functions are overrides required by Solidity.

    function mintToken() external {
        // require(
        //     !_minted[msg.sender],
        //     "GovernanceToken: You have already minted a token"
        // );
        _minted[msg.sender] = true;
        _mint(msg.sender, MINIAGT);
        _totalMinted += 1;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    function totalMinted() external view returns (uint256) {
        return _totalMinted;
    }
}
