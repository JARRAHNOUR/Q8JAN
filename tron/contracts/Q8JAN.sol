// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title Q8JAN
/// @notice Fixed-supply TRC-20 token.
/// @dev Initial supply is minted once at deployment.
/// No minting function exists after deployment.
contract Q8JAN is ERC20, ERC20Burnable {
    uint256 public constant MAX_SUPPLY = 100_000_000_000 * 10 ** 18;

    constructor() ERC20("Q8JAN", "Q8JAN") {
        _mint(msg.sender, MAX_SUPPLY);
    }
}