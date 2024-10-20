# `RPC` (Remote Procedure Call)

In later `Solidity` development, almost all interactions with the blockchain depend on **`RPC`**.

This chapter explains the role of `RPC` and introduces three frequently used `RPC` methods.

`RPC` is a way to interact with blockchain nodes remotely over a network, allowing us to deploy contracts, query on-chain information, etc.

You can think of the blockchain as a remote server (this analogy is just for an abstract concept and not precise), and `RPC` is used to send commands to interact with it.

## Use Cases of RPC

### 1. Contract Deployment

After writing a `Solidity` contract, you need to deploy it on the blockchain. This process relies on `RPC`, which sends your deployment request to a remote blockchain node for processing.

**Contract Deployment Example**:

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
// The return value is the transaction hash
"result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

Note that we use `eth_sendTransaction` here. Through this method, we send a transaction to the blockchain network, and the node will package it upon receipt.

All "write" operations interacting with the blockchain (contract deployment, transfers) use `eth_sendTransaction`.

### 2. Retrieving Address Information

When you need to query an account's balance, you can send a request via `RPC`. The blockchain will return the relevant data based on your request.

**Retrieve Account Balance Example**:

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
  "result": "0x7c2562030800" // The returned balance is in hexadecimal format
}
```

### 3. Reading Data from a Contract

`eth_call` is used to call on-chain data without sending a transaction.

Suppose we have a `Todo` contract with a `getTask` view function, which returns details of a task based on its ID, including its ID, creation date, content, status, and completion date.

`Todo` Contract Code Snippet:

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

Suppose the `Todo` contract is deployed at address `0xYourContractAddress`. You can use the following `RPC` request to get information for the task with ID 1.

`RPC` Request Example:

```bash
curl -X POST -H "Content-Type: application/json" --data '{
"jsonrpc":"2.0",
"method":"eth_call",
"params":[{
 "to": "0xYourContractAddress",   // Address of the Todo contract
 "data": "0x..."                  // Encoded getTask method and parameter (e.g., id = 1)
}, "latest"],
"id":1
}' https://eth.drpc.org
```

With this request, you can call the `getTask` method and get detailed information about the task.

**Note**: Using `eth_call` does not consume `gas` or require payment, as it is a simulated execution.

## How to Obtain `RPC`

To find a suitable `RPC` provider, you can consider the following options:

- **Alchemy**: A service provider supporting mainstream blockchains like Ethereum, suitable for developers. You can apply for free or paid `RPC` services via [Alchemy](https://www.alchemy.com).
- **Google Search**: Directly search "Ethereum RPC providers" or the chain you need (e.g., "Polygon RPC providers") on Google to find multiple options.
- **Blockchain Official Website**: Many blockchains provide public `RPC` interfaces in their official documentation. For example, `BNB` lists public nodes in its [official documentation](https://docs.bnbchain.org/bnb-greenfield/for-developers/network-endpoint/endpoints/?h=rpc).

### `RPC` Quota Limits

Most `RPC` providers set quota limits, especially for free users. The limitations usually involve:

- **Daily Request Limit**: Free plans typically set a maximum number of requests per day or month.
- **Request Rate Limit**: There is also a limit on the number of requests that can be sent per second. Exceeding the rate may result in request failures or delays.
- **Compute Units (CU) Based on Call Count**: Some `RPC` providers use `CU` (Compute Units) as a standard for measuring call consumption. Different `RPC` methods consume different amounts of `CU`. For example, a simple data query may consume fewer `CU`, while complex on-chain state calculations consume more. The more calls made, the higher the `CU` consumption. When the `CU` limit is reached, `RPC` requests may be rejected or slowed down.

For instance, Alchemy allocates different `CU` consumption based on the complexity of each call. Developers can monitor and manage `CU` usage when calling interfaces to ensure quotas are not exceeded.

## Summary

`RPC` is one of your core tools for interacting with the blockchain.

In `Solidity` development, whether deploying contracts or retrieving on-chain data, `RPC` is essential. It serves as the bridge connecting local applications with the remote blockchain.

## Reference

- [Ethereum JSON-RPC API Documentation](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Ethereum JSON-RPC Postman Collection](https://www.postman.com/zhangen69/public/folder/oz4nbru/eth)
- [Compute Unit Explanation](https://docs.alchemy.com/reference/compute-unit-costs)
