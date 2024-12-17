# 提供查询方法

## 关于本节

随着我们的 [TODO](../../../example/solidity_todo_example/contracts/Todo.sol) 合约逐渐成型，用户可以创建任务，改变任务的状态和删除任务。

但仅仅能够创建任务还不够，因为任务被创建后，用户还需要一种便捷的方式来查看和管理这些任务。

因此，本节将带领大家实现关键的查询函数，让我们能够查看任务详情和确认任务的存在。

## 代码编写

### 实现 Task 查询

查询类函数一般并不复杂, 只要从对应的数据结构中取出想要的数据, 稍微做一些加工。

Task 查询代码如下:

```solidity
function getTask(uint256 id) public view taskExists(id) returns (Task memory task) {
    task = tasks[id];
}
```

这段代码使用了 `taskExists` 修饰符：还记得吗，在之前的删除任务章节中，我们声明了 `taskExists` 这个修饰符，用于验证任务的存在性。在这里再次使用它，确保在函数执行前先检查任务是否存在。这种方式比直接在函数中使用 `require` 更简洁，使代码结构更清晰。

另外, 我们定义了 `getTask` 函数，添加了 `public` 和 `view` 修饰符。`public` 表明该函数是公开可访问的，`view` 表示该函数不会修改合约的状态。

### 函数类型: view、pure

在 `Solidity` 中，函数类型有 `view`、`pure` 和 普通函数三种，合理选择这些修饰符可以有效优化代码：

- **view 函数**：**可以读取**合约中的状态变量，但**不能修改**它们。比如我们的 getTask 就是 view 函数，因为它只需读取任务数据，而不涉及数据变更。
- **pure 函数**：即纯函数，既**不读取也不修改状态变量**，通常用于计算。例如，我们可以定义一个简单的加法函数 add(uint x, uint y) pure returns (uint)。
- **普通函数**：即不带 view 或 pure 修饰符的函数，**可以对状态变量进行读写操作**。创建任务的 createTask 函数就是一个典型的普通函数。

理解和使用合适的修饰符可以提升代码的可读性，帮助开发者明确函数的用途。

### 自动生成的 Getter 函数

在 `Solidity` 中，当一个状态变量设置为 `public` 时，编译器会自动生成一个 `Getter` 函数，帮助我们轻松查询该变量的值。例如：

```solidity
mapping(uint256 => Task) public tasks;
```

上面代码中的 `tasks` 属性映射定义为 `public`，`Solidity` 编译器会自动为我们生成一个 `tasks(uint256)` 的 `view` 函数，可以直接通过任务 `id` 获取任务详情。

因此, 出于教学目的, 尽管合约中已经生成了自动的 `tasks(uint256)` 查询函数，但本节仍然编写了 `getTask` 函数。主要目的是让你熟悉手动编写查询函数的步骤，为后续开发复杂查询接口打下基础。

## 小结

在本节中，我们实现了任务查询的功能。

在后面的教程中，我们将进一步探索如何通过 `RPC` 调用查询函数，与合约进行交互，为应用添加更多动态查询功能。

## 附加资源

- [Solidity by Example](https://solidity-by-example.org/)
