# Creating a TODO Contract

## About This Section

In this section, we will learn how to create a simple Solidity contract file and introduce the basic structure of a contract file. We will write a contract named `TodoList`, which will eventually become a fully functional task management contract (TODO List).

## Overview of Contract Structure

Each Solidity contract file is typically composed of the following parts:

1. **Version Pragma**: Specifies the version of the Solidity compiler to use.
2. **Contract Definition**: Defines the name and functionality of the contract.
3. **State Variables**: Store data for the contract (not included in this section).
4. **Constructor**: Initializes the contract’s state (not included in this section).
5. **Functions**: Define the behavior and logic of the contract (not included in this section).

## Creating the Contract File

Create a new Solidity file inside the `contracts/` directory and name it `TodoList.sol`. The file content will be:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TodoList {
    // TODO: Define state variables and functions here
}
```

## Explanation of File Structure:

**`SPDX-License-Identifier: MIT`**: This is a license statement. It is recommended to provide an open-source license (MIT) for the contract, indicating that the code is free to use. **Based on the author's actual development experience, MIT has been used every time.**.

**`pragma solidity ^0.8.24;`**: This specifies the Solidity version. The `^` symbol (caret) is used to indicate compatibility with compiler versions. It means the code can be compiled with version 0.8.24 or any version below 0.9.0.

**How to choose the right version?** If you're using Hardhat, check the `solidity.compilers.version` field in your `hardhat.config.ts` file and ensure it matches.

**`contract TodoList`**: This declares the contract. **contract** is a keyword used to define a smart contract, which is similar to a class in programming. `TodoList` is the name of the contract, and all functionalities will be implemented within this structure.

## Summary

In this section, we introduced the basic structure of a Solidity contract file and created an empty contract file. In the next section, we will begin defining state variables for the TODO contract.

#### Additional Resources

1. **Version Pragma**: Read Solidity's [official documentation](https://docs.soliditylang.org/en/v0.8.27/layout-of-source-files.html#pragma) to understand versioning and its purpose in more detail.

2. **Solidity Version Differences**: Explore the updates in the Solidity 0.8.x series and understand why this version is a good starting point for contract development. Check out this [Solidity 0.8.x release note](https://docs.soliditylang.org/en/v0.8.27/080-breaking-changes.html). It provides a general understanding and doesn't require deep study—just a quick overview for now. You can always come back to it when you encounter specific issues.

3. **Open Source Licenses for Smart Contracts**: Learn more about different open-source licenses (e.g., MIT, GPL) and their impact on your project. You can refer to the [SPDX License List](https://spdx.org/licenses/) for more information.