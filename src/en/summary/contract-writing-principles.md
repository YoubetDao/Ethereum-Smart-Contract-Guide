# Contract Writing Principles

## About This Section

Following a clear set of principles when writing Ethereum smart contracts helps build safer, more scalable, and efficient contracts.

In this section, we will explore key principles in contract design. Whether constructing a simple [TODO](../../../example/solidity_todo_example/contracts/Todo.sol) contract or complex financial contracts, adhering to these principles ensures more robust code.

## Principles

In the process of developing smart contracts, prioritize the **security** of the contract first, followed by **performance**, and then others.

**Security > Performance > Others**: In the world of smart contracts, security is the absolute priority. Performance can be optimized on the premise of security, and other features can be added as needed, but never at the expense of security.

### Security

Security is the core of smart contract development. Our goal is to ensure that contracts are not vulnerable to attacks and that funds are secure.

1. **Test Your Contracts:** Always write test code for each function point when developing smart contracts. Testing helps uncover hidden vulnerabilities and ensures high-quality code, especially since contracts cannot be modified once deployed.

2. **Avoid Using `tx.origin` for Authorization Control:** `tx.origin` is susceptible to phishing attacks and is not suitable for authorization verification. Attackers can exploit malicious contracts to deceive users, leading to the misuse of `tx.origin`. Use `msg.sender` for verification to avoid such attacks.

   ```solidity
   // Unsafe example
   function onlyOwner() public view {
       require(tx.origin == owner, "Not authorized"); // Not recommended to use tx.origin
       // Business logic
   }

   // Safe example
   function onlyOwner() public view {
       require(msg.sender == owner, "Not authorized"); // Use msg.sender
       // Business logic
   }
   ```

3. **Prevent Reentrancy Attacks:** When interacting with external contracts or complex logic, use [ReentrancyGuard](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard) to prevent reentrancy attacks.

### Performance

Code executed on Ethereum consumes `Gas`, and optimizing contract performance can reduce user costs and improve contract response speed.

1. **Reduce Storage Operations:** Each write operation to on-chain storage consumes a large amount of `Gas`. Therefore, minimize the number of storage operations and avoid unnecessary data updates and large data writes.

   ```solidity
   // Not recommended: multiple storage updates
   function inefficientUpdate(uint256 newValue) public {
       myStoredValue = newValue;
       anotherStoredValue = newValue;
   }

   // Recommended: optimize storage updates
   function optimizedUpdate(uint256 newValue) public {
       if (myStoredValue != newValue) {
           myStoredValue = newValue;
       }
       if (anotherStoredValue != newValue) {
           anotherStoredValue = newValue;
       }
   }
   ```

   In actual development, **if you plan to deploy an NFT contract, avoid using ERC721Enumerable unless necessary**. `ERC721Enumerable` tracks and enumerates all `Token IDs` through additional storage, significantly increasing each operation's cost. After the first minting, the cost is almost three times higher than `ERC721`!

2. **Move Calculations Off-Chain:** When security can be ensured, move complex calculation logic off-chain to reduce `Gas` costs. For example, you can calculate off-chain and then submit the result on-chain for contract verification. If you're working on a `DeFi` project, the matching logic can be computed offline.

3. **Optimize Loops and Batch Operations:** Avoid using large loops or batch operations in contracts, especially those involving on-chain storage updates. For handling large data, consider executing in batches or using external batch submission tools to reduce the `Gas` consumption per transaction.

   ```solidity
   // Avoid large loop operations in contracts
   function processInBatches(address[] memory accounts, uint256[] memory values) public {
       uint batchSize = 10; // Execute 10 operations at a time
       for (uint i = 0; i < batchSize; i++) {
           // Processing logic...
       }
   }
   ```

### Other Principles

In contract design, there are also general design principles that do not directly involve security or performance but can improve code clarity and maintainability.

1. **Keep It Modular and Simple:** Split contract code into modular functions, ensuring each function focuses on a single task. Modular code is not only easier to maintain and test but also easier to reuse.

2. **Use Clear Variable and Function Names:** Adopt descriptive variable and function names so that even other developers can understand the contract logic without documentation. This aids code readability and maintainability.

## Summary

Following these principles in future contract writing will make your code more robust and reliable. As blockchain technology evolves, the performance and security standards of smart contracts will also improve, and mastering these fundamental principles will allow you to navigate future contract development with ease.

## Additional Resources

- [Solidity Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Ethereum Smart Contract Best Practices](https://ethereum.org/en/developers/docs/smart-contracts/security/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)
- [The Ultimate Guide to NFT Gas Optimization](https://learnblockchain.cn/article/3920)