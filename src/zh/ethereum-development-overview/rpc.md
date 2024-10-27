# `RPC`（远程过程调用）

在后面 `Solidity` 开发中，我们与区块链的所有交互, 几乎都依赖于 **`RPC`**。

所以本章单独讲一下 `RPC` 的作用，介绍 3 个经常使用的 `RPC` 方法。

`RPC` 是一种通过网络，与区块链节点远程交互的方式，可以让我们部署合约、查询链上信息等。

你可以把区块链想象成一个远程的服务器（这里的类比只是为了让你有个抽象的概念，并不精确），而 `RPC` 就是发出命令与其进行交互的方式。

## RPC 的使用用场景

### 1. 合约部署

当你写好 `Solidity` 合约后，你需要将合约部署到区块链上。这个过程依赖于 `RPC`，`RPC` 会将你的部署请求发送到远程的区块链节点进行处理。

**合约部署示例**：

```bash
curl -X POST -H "Content-Type: application/json" --data '{
  "jsonrpc":"2.0",
  "method":"eth_sendTransaction",
  "params":[{...}],
  "id":1
}' https://eth.drpc.org

{  
"id": 1,  
"jsonrpc": "2.0",  
// 返回值是交易的 hash
"result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"  
}
```

注意，这里我们使用的是 `eth_sendTransaction`。通过这个方法，我们发送一笔交易到区块链网络，节点收到后会进行打包。

所有与区块链交互的“写”操作（合约部署、转账），都使用 `eth_sendTransaction`。

### 2. 获取地址信息

当你需要查询某个账户的余额，你可以通过 `RPC` 发送请求。区块链会根据你的请求，返回相关的数据。

**获取账户余额示例:**：

```bash
curl -X POST -H "Content-Type: application/json" --data '{
"jsonrpc":"2.0",
"method":"eth_getBalance",
"params":["0x...YourAddress", "latest"],
"id":1
}' https://eth.drpc.org

{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x7c2562030800" // 返回的余额是十六进制格式
}
```

### 3. 从合约中读取数据

`eth_call` 用于在不发送交易的情况下调用链上数据。

假设我们有一个 `Todo` 合约，合约中有 `getTask` 这样一个 `view` 函数，如下所示。它根据任务 ID 返回该任务的详细信息，包括任务的 ID、创建日期、内容、是否完成以及完成日期。

`Todo` 合约代码片段:

```solidity
contract Todo {
 struct Task {
     uint256 id;
     uint256 date;
     string content;
     bool done;
     uint256 dateComplete;
 }

 mapping(uint256 => Task) public tasks;

 function getTask(uint256 id) public view returns (Task memory task) {
     task = tasks[id];
 }
}
```

假设 `Todo` 合约部署在地址 `0xYourContractAddress`，你可以通过以下 `RPC` 请求，获取任务 ID 为 1 的任务信息。
`RPC` 请求示例:

```bash
curl -X POST -H "Content-Type: application/json" --data '{
"jsonrpc":"2.0",
"method":"eth_call",
"params":[{
 "to": "0xYourContractAddress",   // Todo 合约的地址
 "data": "0x..."                  // getTask 方法和参数（如 id = 1）的编码
}, "latest"],
"id":1
}' https://eth.drpc.org
```

通过这个请求，你可以调用 `getTask` 方法，并获得任务的详细信息。

**Note**: 使用 `eth_call` 不需要消耗 `gas`，也不需要付费，因为它是一个模拟执行。

## 如何获得 `RPC`

寻找一个合适的 `RPC` 提供商，可以通过以下几种方式：

- **Alchemy**：这是一个支持以太坊等主流区块链的服务提供商，适合开发者使用。你可以通过 [Alchemy](https://www.alchemy.com) 申请免费或付费的 `RPC` 服务。
- **Google 搜索**：直接在 `Google` 上搜索 "Ethereum RPC providers" 或你需要的链（如 "Polygon RPC providers"），可以找到多个选项。
- **区块链官网**：很多区块链都会在官方文档中提供公共 `RPC` 接口。例如，`BNB` 在其[官方文档](https://docs.bnbchain.org/bnb-greenfield/for-developers/network-endpoint/endpoints/?h=rpc)中列出了公共节点。

### `RPC` 的额度限制

大多数 `RPC` 提供商都会设置额度限制，尤其是对于免费用户。限制通常体现在以下几个方面：

- **每日请求限制**：免费计划的 `RPC` 服务通常会设置每日或每月的最大请求次数。
- **请求速率限制**：每秒能够发送的请求次数也有限制，超出速率可能会导致请求失败或延迟。
- **根据调用次数计算 `CU`（Compute Units）**：一些 `RPC` 提供商使用 `CU`（计算单元）作为衡量调用消耗的标准。不同的 `RPC` 方法会消耗不同数量的 `CU`，例如一次简单的数据查询可能消耗较少的 `CU`，而复杂的链上状态计算则会消耗更多的 `CU`。调用次数越多，`CU` 消耗就越高。当达到 `CU` 限额时，`RPC` 请求可能会被拒绝或变慢。

例如，Alchemy 会根据每次调用的复杂性分配不同的 `CU` 消耗，开发者可以在调用接口时监控和管理 `CU` 使用情况，以确保不会超出配额。

## 总结

`RPC` 是你与区块链交互的核心工具之一。

在 `Solidity` 开发中，无论是部署合约还是获取链上数据，都需要依赖 `RPC`。它是连接本地应用与远程区块链的桥梁。

## Reference

- [Ethereum JSON-RPC Api 文档](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Ethereum JSON-RPC Postman 集合](https://www.postman.com/zhangen69/public/folder/oz4nbru/eth)
- [Compute Unit 解释](https://docs.alchemy.com/reference/compute-unit-costs)
