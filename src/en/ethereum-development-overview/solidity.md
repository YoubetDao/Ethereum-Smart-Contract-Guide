# Solidity

`Solidity` is a high-level, contract-oriented programming language used for developing Ethereum smart contracts.

`Solidity` is the only official language for Ethereum, unlike `Solana`, which can use multiple languages like `Rust` and `C++`. Although `Vyper` can also be used for Ethereum application development, it is not recommended due to security issues such as reentrancy vulnerabilities.

## Key Features

- **Contracts**: The basic unit in `Solidity`, used to define state and behavior, similar to classes in `Java`.
- **Inheritance**: Supports single and multiple inheritance, making code reuse more flexible.
- **Interfaces**: Used to define standard functions, ensuring contracts adhere to certain specifications.
- **Events**: Used for logging and monitoring activities within contracts.
- **Libraries**: Reusable code modules that help simplify common operations.

## Data Types

`Solidity` supports common data types such as integers, booleans, arrays, and mappings. It also provides some unique types like the `address` type.

**Note**: **Solidity does not support floating point numbers**. If needed, you can simulate decimals using integers.

## Common Libraries

It is recommended to use well-audited library code such as `OpenZeppelin`. These libraries are thoroughly tested and audited, enhancing the security and reliability of contracts.

- If you plan to issue a Token, consider using: [OpenZeppelin ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- If you plan to issue an NFT, consider using: [OpenZeppelin ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- If you need access control for your contract, consider using: [OpenZeppelin Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) and [OpenZeppelin AccessControl](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol)
- If you need upgradeable contracts, consider reading: [OpenZeppelin Upgrade](https://docs.openzeppelin.com/upgrades)

`OpenZeppelin` offers more features and implementations. Developers can visit their official documentation for detailed information and example code.

## Additional Resources

1. **Vyper Reentrancy Vulnerability**: [Link](https://www.chaincatcher.com/article/2098263)
