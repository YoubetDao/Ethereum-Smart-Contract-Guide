# 合约部署

## 关于本节

在区块链开发中，智能合约的部署是关键步骤之一。

本章节将介绍如何使用 `hardhat` 的 **Ignition** 框架来编写和执行合约的部署脚本，包含部署到本地、测试网的步骤。合约的验证也将与部署过程结合在一起。

## 编写部署脚本

### 部署脚本的结构 & 要素

部署脚本在项目中扮演着重要角色，它能够自动化部署流程，确保智能合约的部署一致且可重复。

以下是一个简单的例子，展示了一个部署脚本的基础结构：

```typescript
...
const xxxModule = buildModule("xxx", (m) => {
  const xxx = m.contract("xxx"); // 部署合约
  return { xxx };
});

export default xxxModule;
```

**部署脚本的要素**:

- `buildModule` 是用于定义部署模块的函数，它将合约的部署逻辑封装在一个模块中，便于管理和组织。它接收两个参数：
  - **moduleId**：一个字符串，用于标识这个模块的名称, 可以根据你的合约功能进行命名。
  - **moduleDefinitionFunction**：一个异步回调函数，内部定义了如何部署合约、部署顺序、依赖关系等内容(如果有多个合约需要部署). 它包含部署合约的具体代码，`m` 是该回调函数的参数，表示执行的上下文, 比如当前的 network 等等, 好奇的读者可以打印看看。
- `m.contract("Todo")` 是部署合约的核心命令，用来部署名为 `Todo` 的合约。

### 编写部署脚本

我们接下来会逐步编写部署脚本，演示如何构建一个部署过程。

代码统一放在 `./ignition/modules` 目录下。 我们在该目录创建一个 `ToDo.ts` 文件, 存放部署 `ToDo` 合约的代码。

#### 第一步：声明模块

首先，我们使用 `buildModule` 声明一个模块，用于组织合约和相关参数。

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TodoModule = buildModule("TodoModule", (m) => {});

export default TodoModule;
```

#### 第二步：部署合约

然后，通过 `m.contract` , 指定我们想要部署的合约 `Todo` ：

```typescript
...

const TodoModule = buildModule("TodoModule", (m) =>
	const todo = m.contract("Todo");
	return { todo };
});

...
```

如果合约的构造函数需要参数，你可以像这样处理：

```typescript
const todo = m.contract("Todo", ["参数1", "参数2"]);
```

如果部署的合约需要发送 `ETH`，你可以像这样处理：

```typescript
const todo = m.contract("Todo", { value: ethers.utils.parseEther("1.0") });
```

至此，我们的基础脚本已经完成，可以满足大部分简单的部署需求。

## 合约部署

### 部署在本地网络

我们首先部署到本地网络，这有助于测试和调试。

#### 启动本地节点

使用以下命令启动本地网络：

```bash
yarn hardhat node
```

这将启动一个 `Hardhat` 内置的本地区块链节点。你可以使用控制台观察交易过程。

#### 部署到本地网络

使用下面的命令部署合约到本地节点：

```bash
yarn hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
```

此时，控制台会输出合约的部署地址，你可以通过日志查看这些信息：

```bash
Contract deployed at address: 0x...
```

### 部署到测试网

以 `Sepolia` 测试网为例，我们需要首先在 `hardhat.config.ts` 中添加 `sepolia` 测试网配置：

```typescript
const config: HardhatUserConfig = {
	...

	networks: {
		sepolia: {
			// 指定 RPC, 用于与区块链节点通信: 获取链上信息, 广播合约部署交易
			url: "https://rpc.sepolia.org",

			// 指定私钥, 用来签名部署合约的交易 (注意, 请不要在其他地方使用这个私钥)
			accounts:["0x9639c7fbbb91b804bf223d3c0c47d38a37cfc59dd8a5b13d0697bbe51ad03e21"]

}

},

};
```

**注意:**

1. **在部署智能合约时，私钥的管理至关重要**。请务必确保**绝不要在非必要场合泄露或分享你的私钥**，尤其是用于生产环境的私钥。私钥相当于你的数字资产的钥匙，一旦被泄露，可能导致不可挽回的损失。
2. 除了配置 `url` 和 `accounts` ，你还可以自定义 `gasPrice`、`gasLimit` 等参数，进一步控制合约的部署。建议你根据项目需求，探索更多的配置选项。

部署到需要消耗一定的主链币, 支付给矿工。我们可以使用水龙头领取测试币: [链接](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

然后，通过以下命令部署到测试网：

```bash
yarn hardhat ignition --module TodoModule --network sepolia
```

注意, 这里我们更改 `--network` 参数的值为 `sepolia`。

### 部署到生产环境

到这里你已经掌握了如何使用 Ignition 框架进行智能合约的部署，成功完成了本地和测试网的部署工作。

部署到生产环境（如以太坊主网）是你最后的挑战！虽然听起来有些令人紧张，但请相信，经过了前面的学习和实践，你已经具备了完成这一步的能力。

记住，生产环境与测试网的流程大同小异，你只需要根据主网的 **RPC** 和**私钥**配置，按照相同的步骤进行部署。

主网的唯一不同之处在于它是真实的网络，处理的是实际的资金与数据，因此每一步都需要更小心。

## 小结

本文介绍了如何通过 `Ignition` 部署智能合约，涵盖了本地和测试网的部署步骤。通过掌握这些基础流程，您可以进一步扩展到更复杂的合约场景。

## 附加资源

- [Hardhat 合约部署指南](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- [Hardhat 合约验证指南](https://hardhat.org/hardhat-runner/docs/guides/verifying)
