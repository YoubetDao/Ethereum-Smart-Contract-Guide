# Contract Deployment

## About this Section

In blockchain development, deploying smart contracts is one of the key steps.

This chapter will introduce how to write and execute contract deployment scripts using the **Ignition** framework from `hardhat`, covering deployment to both local and test networks. Contract verification will also be integrated with the deployment process.

## Writing Deployment Scripts

### Structure & Elements of the Deployment Script

Deployment scripts play a crucial role in projects, automating the deployment process and ensuring that contracts are deployed consistently and reproducibly.

Below is a simple example demonstrating the basic structure of a deployment script:

```typescript
...
const xxxModule = buildModule("xxx", (m) => {
  const xxx = m.contract("xxx"); // Deploy the contract
  return { xxx };
});

export default xxxModule;
```

**Key elements of the deployment script**:

- `buildModule` is the function used to define deployment modules, encapsulating contract deployment logic in a module for easier management and organization. It takes two parameters:
  - **moduleId**: A string that identifies the name of the module, which can be named according to the functionality of your contract.
  - **moduleDefinitionFunction**: An asynchronous callback function that defines how to deploy contracts, their deployment order, dependencies, etc. (if multiple contracts need to be deployed). It includes the code to deploy the contract, and `m` is the function’s parameter, representing the execution context (e.g., the current network). Curious readers can log this to explore further.
- `m.contract("Todo")` is the core command for deploying contracts, used here to deploy the contract named `Todo`.

### Writing the Deployment Script

Next, we'll gradually write the deployment script, demonstrating how to build a deployment process.

The code is placed in the `./ignition/modules` directory. We will create a `ToDo.ts` file in that directory to store the deployment code for the `ToDo` contract.

#### Step 1: Declare the Module

First, we use `buildModule` to declare a module for organizing contracts and related parameters.

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TodoModule = buildModule("TodoModule", (m) => {});

export default TodoModule;
```

#### Step 2: Deploy the Contract

Next, through `m.contract`, we specify the `Todo` contract we want to deploy:

```typescript
...

const TodoModule = buildModule("TodoModule", (m) => {
  const todo = m.contract("Todo");
  return { todo };
});

...
```

If the contract’s constructor requires parameters, you can handle it like this:

```typescript
const todo = m.contract("Todo", ["param1", "param2"]);
```

If the contract requires sending `ETH` during deployment, you can handle it like this:

```typescript
const todo = m.contract("Todo", { value: ethers.utils.parseEther("1.0") });
```

At this point, our basic script is complete and can meet most simple deployment needs.

## Contract Deployment

### Deploying to a Local Network

We first deploy to a local network to facilitate testing and debugging.

#### Starting the Local Node

Use the following command to start the local network:

```bash
yarn hardhat node
```

This will start a `Hardhat`-built-in local blockchain node, and you can observe the transaction process via the console.

#### Deploying to the Local Network

Use the following command to deploy the contract to the local node:

```bash
yarn hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost
```

At this point, the console will output the deployed contract address, and you can check this information via the logs:

```bash
Contract deployed at address: 0x...
```

### Deploying to a Testnet

Taking the `Sepolia` testnet as an example, we first need to add the `sepolia` testnet configuration in `hardhat.config.ts`:

```typescript
const config: HardhatUserConfig = {
	...

	networks: {
		sepolia: {
			// Specify the RPC to communicate with the blockchain node: obtain on-chain information, broadcast contract deployment transactions
			url: "https://rpc.sepolia.org",

			// Specify the private key to sign the deployment transaction (be careful not to use this private key elsewhere)
			accounts:["0x9639c7fbbb91b804bf223d3c0c47d38a37cfc59dd8a5b13d0697bbe51ad03e21"]

        }
    }
};
```

**Note:**

1. **Managing private keys is crucial when deploying smart contracts**. Always ensure that your private key is never disclosed or shared unnecessarily, especially for production environments. Private keys are akin to the keys to your digital assets, and their leakage could lead to irrecoverable losses.
2. Besides configuring the `url` and `accounts`, you can also customize parameters like `gasPrice` and `gasLimit` to further control the contract deployment. Depending on your project needs, feel free to explore more configuration options.

Deploying to a testnet requires using test coins to pay miners. You can obtain test coins via a faucet: [Link](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

Then, deploy to the testnet with the following command:

```bash
yarn hardhat ignition --module TodoModule --network sepolia
```

Note that we change the `--network` parameter value to `sepolia` here.

### Deploying to Production

At this point, you've mastered how to deploy smart contracts using the Ignition framework and successfully completed local and testnet deployments.

Deploying to production (e.g., the Ethereum mainnet) is your final challenge! Although it may sound intimidating, rest assured that after all the learning and practice, you're fully capable of completing this step.

Remember, the production environment is similar to the testnet process, and you only need to configure the **RPC** and **private key** for the mainnet and follow the same steps for deployment.

The only difference is that the mainnet is a real network handling actual funds and data, so every step needs to be taken more carefully.

## Conclusion

This article introduced how to deploy smart contracts using `Ignition`, covering deployment to both local and test networks. By mastering these basic workflows, you can further extend to more complex contract scenarios.

## Additional Resources

- [Contract Deployment Guide](https://hardhat.org/hardhat-runner/docs/guides/deploying)

- [Contract Verification Guide](https://hardhat.org/hardhat-runner/docs/guides/verifying)
