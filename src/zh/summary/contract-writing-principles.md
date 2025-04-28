# 合约编写原则

## 关于本节

在编写以太坊智能合约时，遵循一套清晰的原则，有助于构建更安全、可扩展和高效的合约。

在本节中，我们将探讨合约设计中的关键原则。无论是构建一个简单的 [TODO](../../../example/solidity_todo_example/contracts/Todo.sol) 合约，还是复杂的金融合约，遵循这些原则能确保代码更具健壮性。

## 原则

智能合约开发的过程中, 优先考虑合约的**安全性**，其次是**性能**，最后是其他。

**安全 > 性能 > 其他**：在智能合约的世界中，安全性是绝对优先的。性能可以在安全性保障的前提下进行优化，而其他特性则可以视实际需求加入，但绝不能以牺牲安全为代价。

### 安全

安全性是智能合约开发的核心，我们的目标是确保合约不会受到攻击并保障资金的安全。

1. **测试你的合约:** 在编写智能合约时，务必为每个功能点编写测试代码。测试能够帮助发现隐藏的漏洞，并提供高质量的代码保障，尤其在合约一旦部署即不可修改的情况下更为重要。

2. **避免使用 `tx.origin` 进行权限控制**：`tx.origin` 很容易被利用进行钓鱼攻击，不适合用于权限验证。攻击者可通过恶意合约诱骗用户，使 `tx.origin` 被错误使用。应使用 `msg.sender` 验证权限以避免此类攻击。

   ```solidity
   // 不安全示例
   function onlyOwner() public view {
       require(tx.origin == owner, "Not authorized"); // 不建议使用 tx.origin
       // 业务逻辑
   }

   // 安全示例
   function onlyOwner() public view {
       require(msg.sender == owner, "Not authorized"); // 使用 msg.sender
       // 业务逻辑
   }
   ```

3. **防止重入攻击**：在涉及与外部合约交互/复杂逻辑中，使用 [ReentrancyGuard](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard)，以防止重入攻击。

### 性能

在以太坊上执行的代码需要消耗 `Gas`，优化合约的性能可以减少用户的使用成本，提高合约的响应速度。

1. **减少存储操作**：每次写入链上存储的操作都消耗大量 `Gas`。因此，尽量减少存储的次数，避免不必要的数据更新和大数据量的写入操作。

   ```solidity
   // 不建议：多次存储更新
   function inefficientUpdate(uint256 newValue) public {
       myStoredValue = newValue;
       anotherStoredValue = newValue;
   }

   // 建议：优化存储更新
   function optimizedUpdate(uint256 newValue) public {
       if (myStoredValue != newValue) {
           myStoredValue = newValue;
       }
       if (anotherStoredValue != newValue) {
           anotherStoredValue = newValue;
       }
   }
   ```

   在实际的开发中, **如果你准备部署一个 NFT 合约，避免使用 ERC721Enumerable，除非确有需要**。因为 `ERC721Enumerable` 通过额外存储来跟踪和枚举所有 `Token ID`，导致每次操作的成本大幅增加。`ERC721Enumerable` 在第一次铸造后的成本几乎比 `ERC721` 高出 3 倍！

2. **将计算移出链上**：在能保证安全的前提下，尽量将复杂的计算逻辑移出链上，以减少 `Gas` 费用。比如可以在链下计算完毕后提交计算结果上链，再由链上合约进行结果验证。如果你在做一个 `DeFi`, 其中撮合的逻辑可以在线下计算.

3. **优化循环和批量操作**：尽量避免在合约中使用大型循环或批量操作，尤其是涉及链上存储更新的循环。对于大量数据处理，可以考虑分批执行或借助外部批量提交工具，降低单笔交易的 `Gas` 消耗。

   ```solidity
   // 避免在合约中进行大量循环操作
   function processInBatches(address[] memory accounts, uint256[] memory values) public {
       uint batchSize = 10; // 每次执行 10 个操作
       for (uint i = 0; i < batchSize; i++) {
           // 处理逻辑...
       }
   }
   ```

### 其他原则

在合约设计中，也有一些不直接涉及安全或性能的通用设计原则，可以提高代码的清晰性和可维护性。

1. **保持模块化和简洁**：将合约代码拆分为模块化的函数，确保每个函数专注于单一功能。模块化代码不仅易于维护和测试，还便于重用。

2. **使用明确的变量和函数命名**：采用具有描述性的变量名和函数名，这样即使是其他开发者在没有文档的情况下，也能理解合约的逻辑。这有助于代码的可读性和可维护性。

## 小结

未来的合约编写中，遵循这些原则将使你的代码更具稳健性和可靠性。随着区块链技术的发展，智能合约的性能和安全标准也会不断提升，而掌握这些基础原则将使你在未来的合约开发中游刃有余。

## 附加资源

- [Solidity Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Ethereum Smart Contract Best Practices](https://ethereum.org/en/developers/docs/smart-contracts/security/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)
- [NFT的gas优化终极指南](https://learnblockchain.cn/article/3920)
