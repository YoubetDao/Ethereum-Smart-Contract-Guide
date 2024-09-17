# Solidity TODO Example

该项目展示了一个基础的 Solidity 开发。

它包含一个示例合约、针对该合约的测试以及一个用于部署该合约的 Hardhat Ignition 模块。

## 准备工作

### 代码编辑器

推荐使用 Visual Studio Code (VSCode) 作为代码编辑器。

为了提升开发体验，建议安装 [Hardhat Solidity 插件](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity)，该插件提供 Solidity 代码的智能提示、语法高亮等功能，有助于更高效地编写智能合约。

### 开发工具
使用 `yarn` 作为包管理工具，用于安装项目所需的依赖库。

## 结构
```
.
├── README.md 
├── artifacts   // 编译产物，例如每个合约的 ABI
├── contracts   // 合约代码
├── hardhat.config.ts // Hardhat 配置文件
├── ignition    // 合约部署脚本
├── test    // 合约测试代码
├── typechain-types // 强类型的 TypeScript 类型定义，由智能合约 ABI 文件生成
```

## 你应该了解的 Task

尝试运行以下一些任务：

- 构建项目: `yarn`
- 编译合约: `yarn hardhat compile`
- 运行合约测试: `yarn hardhat test`
- 运行 Hardhat 本地节点: `yarn hardhat node`
- 部署合约到本地 (先启动本地节点): `yarn hardhat ignition deploy ignition/modules/Todo.ts --network localhost --show-stack-traces`