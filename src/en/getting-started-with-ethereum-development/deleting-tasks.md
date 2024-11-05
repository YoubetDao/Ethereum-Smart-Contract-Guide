# Deleting Tasks

## About This Section

Imagine you created a new task in a [TODO](../../../example/solidity_todo_example/contracts/Todo.sol) application, only to find out there was a typo, making the task description inaccurate. To keep the task list tidy and accurate, we need a way to delete these invalid tasks.

In this section, we will learn how to implement task deletion functionality in a contract.

## Writing the Code

Below is a step-by-step guide to help you implement the task deletion functionality.

### Step 1: Define the Event

Events help us track task deletion operations. First, we define a `TaskDeleted` event in the contract to record the `id` of deleted tasks.

```solidity
event TaskDeleted(uint256 id);
```

In `Solidity`, events are a way to log contract activities on the blockchain and are typically used to record important state changes or operations.

Front-end applications can listen to these events to update the user interface in real time when a task is deleted.

### Step 2: Add a Task Existence Check Function

To verify if a task exists, the contract implements a `taskExists` modifier. This avoids invalid deletion operations and enhances code security.

```solidity
modifier taskExists(uint256 _id) {
    require(tasks[_id].id == _id, "Task does not exist.");
    _;
}
```

In `Solidity`, a `modifier` is used to check certain conditions or perform specific actions before a function executes. They help us handle logic like access control and condition checks more succinctly and clearly. The `taskExists` modifier ensures that `deleteTask` can only delete existing tasks, thereby improving code reliability.

### Step 3: Create the Delete Task Function

Implement the `deleteTask` function. First, we ensure the task exists, then delete the task data and the task ID from the `taskIds` array. The implementation logic is as follows:

```solidity
function deleteTask(uint256 id) public taskExists(id) {
    delete tasks[id];

    for (uint256 i = 0; i < taskIds.length; i++) {
        if (taskIds[i] == id) {
            // Set the task ID in the array to 0
            delete taskIds[i];
        }
    }

    emit TaskDeleted(id);
}
```

In this code, we first verify the task's existence. Then, we locate and remove the task by its id using `delete`, and finally trigger the `TaskDeleted` event to record the operation.

**Note**: In Solidity, `delete` **does not remove elements**.

- For `arrays`, `delete` only resets the target element to its default value (e.g., integers to `0`), and does not reduce the array's length. This is a feature that can cause misunderstandings, so developers need to pay special attention to ensure they understand the behavior of `delete` to avoid issues with data remnants or array length misjudgments.

## Summary

In this section, we learned how to implement task deletion functionality in Solidity. By defining events, using the `delete` keyword, and verifying task existence, we can ensure the security and traceability of the deletion feature.

## Additional Resources

- [Solidity Delete](https://docs.soliditylang.org/en/v0.8.17/types.html?highlight=delete#delete)
- [Solidity Event](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html?highlight=event#structure-events)
