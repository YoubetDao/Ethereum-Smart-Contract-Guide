# 链上安全简介

## 关于本节

欢迎来到本教程的最后一个章节！在前面的内容中，我们学习了如何开发、部署链上的应用。然而，在链上开发中，功能实现只是起点，**安全问题**是决定项目能否长期存活的关键。

本节将从**账户安全**和**合约安全**两个方面入手，为大家介绍链上常见的安全问题，以及应对策略，帮助开发者构建更安全的区块链应用。

## 账户安全

### 助记词保管

助记词控制链上资产的关键，泄露助记词都可能导致资产被盗。以下是**不推荐的助记词存储**方式：

- **截图保存在相册**：手机相册可能被恶意应用访问。
- **以文件形式存储**：文件容易被恶意软件扫描。
- **通过微信或其他社交软件明文传输**：社交平台存在数据泄露风险。

**最佳实践**：

- **手抄助记词**并妥善保管。
- 存储在硬件加密设备中（例如硬件钱包）。

### 钱包

钱包是区块链世界的入口, 钱包的安全性至关重要。

因此, **尽量避免使用托管钱包**，因为资产掌控权在第三方手中，存在平台跑路或平台被盗的风险。比如 最近(2024-11-16) 发生的 [DEEX 用户资金被盗事件](https://www.panewslab.com/zh/articledetails/7z2fttnq.html)。

托管钱包提供了便利性, **如果你决定使用托管钱包，务必谨慎，仅存放需要流通的少量资金，将潜在风险降到最低。**

### 授权

`Token` 的授权管理是安全的重要环节，不当的授权可能导致资产被恶意使用。

**问题场景**：

- 用户经常对 `DApp` 授权**无限额度**的 `Token` 操作，而 `DApp` 后端可能被攻击，导致用户资产被恶意转移。

**最佳实践**：

- 定期撤销不必要的授权（可以使用 [revoke.cash](https://revoke.cash)）。
- 优先选择对额度限制的授权。

## 合约安全问题

### 整数溢出

在 `Solidity` 0.8 版本开始，默认会对整数溢出和下溢进行检查，发现溢出时自动 `revert`。然而，仍需注意, 未正确处理溢出可能导致合约逻辑异常，如计数器无法正常递增。

### 权限控制

合约的敏感操作必须受到权限保护，否则可能导致安全漏洞。

**问题场景**：

- 某升级代理合约未设置权限，攻击者通过调用升级函数将代理指向恶意合约，导致资金被盗。

**最佳实践**：

- 使用 `Ownable` 或 `AccessControl` 实现权限控制。

### 闪电贷攻击

闪电贷攻击是一种典型的链上攻击方式。攻击者利用闪电贷的瞬时性借款特性，操控链上协议间的依赖关系，谋取不正当利益。

**示例事件**：

- [2020 年 bZx 闪电贷攻击](https://www.hellobtc.com/kp/du/02/2699.html)：攻击者通过闪电贷操控价格预言机，造成巨额资产损失。

**最佳实践**：

- 谨慎使用价格预言机。
- 在交易逻辑中添加防重入和时间限制。

### 时间戳依赖的隐患

合约中的 `block` 时间戳并不完全可靠，矿工可以在一定范围内操控时间戳。

**问题场景**：

- 在基于时间戳的彩票合约中，矿工能够预测并操控中奖结果。

**最佳实践**：

- 避免将时间戳用于关键性逻辑。
- 对时间戳的依赖应与其他随机源结合使用。

## 小结

链上安全是以太坊开发者的必修课。通过本章的学习，我们从了解了链上常见的风险与应对策略。

当前，**比特币突破 10 万美元关口的时刻可能即将到来**，这标志着区块链技术的价值被越来越多的人认可。保持对区块链技术的关注，并不断学习和更新安全知识，参与这场技术浪潮。

## 附加资源

- [Solidity Top 10 Common Issues](https://checkmarx.com/blog/solidity-top-10-common-issues/)
- [revoke.cash](https://revoke.cash)
- [什么是 DeFi 中的闪电贷？](https://academy.binance.com/zh/articles/what-are-flash-loans-in-defi)
