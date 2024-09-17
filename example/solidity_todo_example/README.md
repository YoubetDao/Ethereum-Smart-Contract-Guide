# Solidity TODO Example

[中文](./README_zh.md)
This project demonstrates a basic solidity development.

It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

## Preparations

### Code Editor

It is recommended to use Visual Studio Code (VSCode) as the code editor.

To enhance the development experience, it’s advised to install the [Hardhat Solidity plugin](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity). This plugin provides IntelliSense, syntax highlighting, and other features for Solidity code, making it easier to write smart contracts efficiently.

### Development Tools

Use `yarn` as the package manager to install the dependencies required for the project.

## Structure

```
.
├── README.md 
├── artifacts   // Compilation output, such as the ABI for each contract
├── contracts   // Contract code
├── hardhat.config.ts // Hardhat configuration file
├── ignition    // Contract deployment scripts
├── test    // Contract test code
├── typechain-types // Strongly typed TypeScript definitions, generated from smart contract ABI files
```

## Task You Should Know

Try running some of the following tasks:

- build project: `yarn`
- compile contract: `yarn hardhat compile`
- run contract test: `yarn hardhat test`
- run hardhat local node: `yarn hardhat node`
- deploy hardhat to local(start local node first) `yarn hardhat ignition deploy ignition/modules/Todo.ts --network localhost --show-stack-traces`