# Hardhat

`Hardhat` is a powerful Ethereum development tool designed for developers to **write, test, and deploy** smart contracts.

Hardhat can significantly enhance development efficiency and project quality.

Below is a step-by-step guide to help you create a simple `Todo` project and initialize it with `Hardhat`.

## Create a Todo Project and Initialize with Hardhat

### Step 1: Install Node.js and Yarn

Ensure that `Node.js` and `Yarn` are installed on your system.

You can check using the following commands:

```bash
node -v
yarn -v
````

If not installed, you can install them using:

```bash
brew install node  // Install Node.js
brew install yarn  // Install Yarn
```

### Step 2: Create Project Folder

Create a new folder in your working directory:

```bash
mkdir solidity_todo_example

cd solidity_todo_example
```

### Step 3: Initialize Project

Run the following command in the project root directory to initialize:

```bash
yarn init -y
```

Use the `yarn init` command to initialize a new `Node` project.

This will create a `package.json` file in your project directory containing the basic information and configuration of the project.

### Step 4: Install Hardhat

Install `Hardhat` using `Yarn`:

```bash
yarn add --dev hardhat
```

### Step 5: Initialize Hardhat Project

In the project directory, run the following command to initialize `Hardhat`:

```bash
yarn hardhat init
```

Select `Create a TypeScript project` and follow the prompts to complete the setup.

### Step 6: Project Structure

After initialization, the following default directory structure will be created:

- `contracts/`: Contains Solidity contract code.
- `test/`: Contains test files.
- `hardhat.config.ts`: Hardhat configuration file.

## Step 7: Install Hardhat VSCode Extension

It is recommended to install the [`Hardhat VSCode Extension`](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity) to enhance development efficiency. This extension offers the following features:

- **Solidity Syntax Highlighting**: Helps you read and write contract code more easily.
- **IntelliSense**: Speeds up coding and reduces errors.
- **Error Highlighting**: Provides real-time syntax and logic error alerts while coding.
- **Integrated Debugging**: Makes testing and debugging smart contracts more convenient.

Using this extension can significantly improve your development experience, making smart contract development smoother.

### Next Steps

Contract compilation, testing, deployment, and network configuration will be detailed in subsequent sections.

## Summary

Congratulations on successfully initializing the Hardhat project! This is just the starting point for smart contract development.

In the upcoming sections, you will learn how to write, test, and deploy contracts.

Keep up the good work, and you'll make great progress in Ethereum development.