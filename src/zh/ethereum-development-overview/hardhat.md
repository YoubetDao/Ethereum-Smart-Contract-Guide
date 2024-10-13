# Hardhat

`Hardhat` 是一个强大的以太坊合约开发工具，专为开发者**编写、测试和部署**智能合约而设计。

Hardhat 能显著提升开发效率和项目质量。

以下是逐步指南，帮助你创建一个简单的 `Todo` 项目, 并使用 `Hardhat` 进行初始化。

## 创建一个 Todo 项目并使用 Hardhat 初始化

### 步骤 1: 安装 Node.js 和 Yarn

确保你的系统上已经安装了 `Node.js` 和 `Yarn`。

你可以使用以下命令来检查：

```bash
node -v
yarn -v
```

如果还没有安装, 可以通过以下命令安装：

```bash
brew install node  // 安装 Node.js
brew install yarn  // 安装 Yarn
```

### 步骤 2: 创建工程文件夹

在你的工作目录下创建一个新的文件夹：

```bash

mkdir solidity_todo_example

cd solidity_todo_example

```

### 步骤 3: 初始化工程

在项目根目录中运行以下命令进行初始化：

```bash

yarn init -y

```

使用 `yarn init` 命令来初始化新的 `Node` 项目。

它会在你的项目目录中创建一个 `package.json` 文件，该文件包含项目的基本信息和配置。

### 步骤 4: 安装 Hardhat

使用 `Yarn` 安装 `Hardhat`：

```bash

yarn add --dev hardhat

```

### 步骤 5: 初始化 Hardhat 项目

在项目目录中，运行以下命令初始化 `Hardhat`：

```bash

yarn hardhat init

```

选择 `Create a TypeScript project`，并按照提示完成设置

### 步骤 6: 项目结构

初始化后，将创建以下默认目录结构：

- `contracts/`: 存放 Solidity 合约代码。
- `test/`: 存放测试文件。
- `hardhat.config.ts`: Hardhat 配置文件。

## 步骤 7: 安装 Hardhat VSCode 插件

建议安装 [`Hardhat 的 VSCode 插件`](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity) 以提升开发效率。该插件提供以下功能：

- **Solidity 语法高亮**：帮助你更轻松地阅读和编写合约代码。
- **智能补全**：加快代码编写速度，减少错误。
- **错误提示**：在编写时实时提示语法和逻辑错误。
- **集成调试**：更方便地测试和调试智能合约。

使用这个插件可以显著提升你的开发体验，让智能合约开发更加顺畅。

### 后续步骤

合约编译、测试、部署和网络配置将在后续章节详细介绍。

## 小结

恭喜你, 成功完成了 Hardhat 项目的初始化！这仅仅是智能合约开发的起点。

在接下来的章节中，你将学习如何编写、测试和部署合约。

继续努力，你将在以太坊开发中取得更大进展。
