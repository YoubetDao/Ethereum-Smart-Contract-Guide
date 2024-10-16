# Solidity

`Solidity` 是一种面向合约的高级编程语言，用于以太坊智能合约的开发。

`Solidity` 是以太坊唯一的官方语言，不同于 `Solana` 可使用 `Rust`、`C++` 等多种语言。虽然 `Vyper` 也可用于以太坊应用开发，但由于安全问题（如`Vyper` 的重入漏洞），不推荐使用。

## 关键特性

- **合约**：`Solidity` 中的基本单元，用于定义状态和行为。类似于 `Java` 中类的概念。
- **继承**：支持单继承和多继承，使代码复用更加灵活。
- **接口**：用于定义标准函数，确保合约遵循某些规范。
- **事件**：用于日志记录和监听合约中的活动。
- **库**：可重用的代码模块，帮助简化常用操作。

## 数据类型

`Solidity` 支持常见的数据类型，如整数、布尔、数组、和字典。也提供一些 `Solidity` 独有的类型，如 `address` 地址类型。

**Note**: **Solidity 不支持浮点数**。如果有需要, 你可以通过使用整数来模拟小数。

## 常用库

推荐尽可能使用经过验证的库代码，如 `OpenZeppelin`。这些库经过广泛测试和审计，可以提高合约的安全性和可靠性。

- 如果你准备发行一个 Token, 建议使用: [OpenZeppelin ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- 如果你准备发行一个 NFT, 建议使用: [OpenZeppelin ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- 如果你需要合约有访问控制, 建议使用: [OpenZeppelin Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol) 和 [OpenZeppelin AccessControl](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol)
- 如果你需要合约有升级能力, 建议先阅读: [OpenZeppelin Upgrade](https://docs.openzeppelin.com/upgrades)

`OpenZeppelin` 提供了更多功能和实现，开发者可以访问其官方文档以获取详细信息和示例代码。

## 附加资源

1. **Vyper 重入锁漏洞**：[链接](https://www.chaincatcher.com/article/2098263)