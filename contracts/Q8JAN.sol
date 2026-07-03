// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Q8JAN is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 100000000000 * 10 ** 18;

    constructor(address initialOwner)
        ERC20("Q8JAN", "Q8JAN")
        Ownable(initialOwner)
    {
        _mint(initialOwner, MAX_SUPPLY);
    }
}