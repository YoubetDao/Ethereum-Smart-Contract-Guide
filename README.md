# Mastering Ethereum Smart Contract Development: A Step-by-Step Guide
[中文](./README-CHINESE.md)

Welcome to the Ethereum-Smart-Contract-Guide!
This guide is designed to teach you master the **basic** and **complete** process of smart contract development (writing, deploying, testing, and calling contracts).

This tutorial does not aim for comprehensive knowledge, but follows Elon Musk's learning method: building a knowledge syntax tree.

```
A bit of advice:
It's important to view knowledge as a semantic tree - make sure you understand the fundamental principles,
i.e. the trunk and big branches, before you get into the leaves/details or there is nothing for them to hang on to.
```

Therefore, this tutorial will focus on core concepts, and we believe that after completing the study, you will have the ability to explore more details independently.

## Table of Contents
1. [Tutorial Introduction](#1-tutorial-introduction)
2. [Ethereum Development Overview](#2-ethereum-development-overview)
3. [Getting Started with Ethereum Development](#3-getting-started-with-ethereum-development-practice)
4. [Advanced Ethereum](#4-advanced-ethereum)
5. [Summary](#5-summary)


## 1. Tutorial Introduction

By developing a practical TODO application, we will gradually delve into various aspects of Ethereum contract development. Starting from the basics and progressing to more complex topics, we ensure that you can firmly grasp the content learned at each step.

## 2. Ethereum Development Overview

### Solidity 
Solidity is the official language of Ethereum, unlike Solana which can use multiple languages such as Rust, C++, etc.

Although Vyper can also be used for Ethereum application development, it is not recommended due to security issues (such as the [Vyper reentrancy vulnerability](https://www.binance.com/en/square/post/884165)).

If you have experience with any programming language, learning Solidity will be relatively easy. Solidity can be understood as a simplified version of high-level languages, for example: Solidity ≈ Java - multithreading.

### Hardhat
Hardhat is a powerful auxiliary tool that provides compilation, testing, and deployment functions, allowing developers to focus on contract development and verification.

Similar tools include the official Remix, open-source Forge, Truffle, etc. This tutorial chooses Hardhat, mastering one is sufficient, there's no need to pursue comprehensiveness.

### RPC (Remote Procedure Call)
After deploying a contract, RPC is needed when calling contract methods or querying data.

RPC is simple to use, just provide a URL, and Hardhat can handle all related operations for us through that URL. We won't delve into specific functions (such as `eth_sendRawTransaction`) for now, focusing on the current learning priorities.

## 3. Getting Started with Ethereum Development Practice
This section begins to involve code writing. It's recommended to practice hands-on, as practice is the best learning method.

We will gradually understand Ethereum contract development by developing a TODO application. After completing this chapter, you will master the basic knowledge of contract development.

### 1. Creating a TODO Contract
Learning content in this subsection: Basic contract structure
### 2. Creating Tasks
Learning content in this subsection: Structs, data structures, functions 
### 3. Completing Tasks (Memory/Storage Concepts)
Learning content in this subsection: Memory/Storage keywords
### 4. Deleting Tasks 
### 5. Providing Query Methods: Get All Tasks, Check if a Task Exists
Learning content in this subsection: View functions
### 6. Contract Refinement
Learning content in this subsection: Use of Events

## 4. Advanced Ethereum

### Contract Testing
Learning content in this subsection: Writing and running contract test code using Hardhat.

The importance of contract testing: You're dealing with real money. And once a contract is deployed, it cannot be modified, leaving you helpless if problems are discovered after going live.

Thorough testing is crucial, and unit tests need to be written. Fortunately, this process is relatively simple.

### Contract Deployment
Learning content in this subsection: Deploying contracts using Hardhat

### Contract Interaction
Learning content in this subsection: Interacting with contracts using Hardhat

## 5. Summary

### Contract Writing Principles
Simply put: Security > Performance > Others.

### Introduction to On-chain Security
On-chain security involves multiple aspects, including reentrancy attacks, integer overflow, access control, etc. Various security risks need to be carefully considered during development. Some real security incidents that have occurred will be showcased here.
