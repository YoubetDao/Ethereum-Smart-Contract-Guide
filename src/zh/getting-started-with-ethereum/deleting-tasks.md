# 删除任务

## 关于本节

想象一下，你在 [TODO](../../../example/solidity_todo_example/contracts/Todo.sol) 应用中创建了一个新任务，结果发现不小心打错了内容，任务描述不准确。为了保持任务列表的整洁和准确，我们需要一种方法来删除这些无效任务。

在本节中，我们将学习如何在合约中实现任务删除的功能。

## 代码编写

以下是分步指南，帮助你逐步实现删除任务的功能。

### 第一步：定义事件

事件帮助我们追踪任务的删除操作。我们首先在合约中定义一个 `TaskDeleted` 事件，以便记录被删除任务的 `id`。

```solidity
event TaskDeleted(uint256 id);
```

在 `Solidity` 中，事件是将合约活动记录到区块链的一种方式，通常用来记录重要的状态变化或操作。

前端应用可以监听这些事件，以便在任务被删除时实时更新用户界面。

### 第二步：添加任务存在的检查函数

为了验证任务是否存在，合约实现了 `taskExists` 修饰符。这可以避免无效的删除操作并提升代码的安全性。

```solidity
modifier taskExists(uint256 _id) {
    require(tasks[_id].id == _id, "Task does not exist.");
    _;
}
```

在 `Solidity` 中，`modifier` 用于在函数执行前检查某些条件或执行特定的操作。它们帮助我们更简洁、清晰地处理权限控制、条件检查等逻辑。通过 `taskExists` 修饰符，确保 `deleteTask` 只能删除存在的任务，从而提高代码的可靠性。

### 第三步：创建删除任务的函数

实现删除任务的 `deleteTask` 函数。首先，我们确保任务存在，然后删除任务数据和 `taskIds` 数组中的任务 ID。该实现逻辑如下：

```solidity
function deleteTask(uint256 id) public taskExists(id) {
    delete tasks[id];

    for (uint256 i = 0; i < taskIds.length; i++) {
        if (taskIds[i] == id) {
            // 将数组中的该任务ID置为0
            delete taskIds[i];
        }
    }

    emit TaskDeleted(id);
}
```

在此代码中，我们先验证任务存在性，然后我们根据 id 找到并将该任务, 使用 `delete` 移除任务, 最后触发 `TaskDeleted` 事件记录操作。

**Note**: 在 Solidity 中，`delete` **不会移除元素**。

- 对于 `array`，`delete` 只会将目标元素重置为默认值（比如整数为 `0`），不会减少数组的长度。这是一个容易引发误解的特性，开发时需特别注意，确保理解 `delete` 的行为，以避免数据残留或数组长度误判的问题。

## 小结

在本节中，我们学习了如何在 Solidity 中实现删除任务的功能。通过定义事件、使用 `delete` 关键字、进行任务存在性验证，我们可以确保删除功能的安全性和可追踪性。

## 附加资源

- [Solidity Delete](https://docs.soliditylang.org/en/v0.8.17/types.html?highlight=delete#delete)
- [Solidity Event](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html?highlight=event#structure-events)
