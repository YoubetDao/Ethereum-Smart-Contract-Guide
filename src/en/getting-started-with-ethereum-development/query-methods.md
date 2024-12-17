# Providing Query Methods

## About This Section

As our [TODO](../../../example/solidity_todo_example/contracts/Todo.sol) contract takes shape, users can create tasks, change task statuses, and delete tasks.

However, creating tasks alone is insufficient, as users will need an efficient way to view and manage these tasks once created.

Therefore, this section will guide you in implementing essential query functions, allowing us to view task details and confirm task existence.

## Code Implementation

### Implementing Task Query

Query functions are generally straightforward, as they only need to retrieve desired data from the corresponding data structure with minimal processing.

The Task query code is as follows:

```solidity
function getTask(uint256 id) public view taskExists(id) returns (Task memory task) {
    task = tasks[id];
}
```

This code uses the `taskExists` modifier. Remember, in the previous task deletion section, we declared the `taskExists` modifier to verify task existence. Here, it is reused to ensure that the task exists before executing the function. This approach is more concise than directly using `require` within the function, making the code structure clearer.

Additionally, we defined the `getTask` function with `public` and `view` modifiers. `public` indicates that this function is accessible publicly, and `view` signifies that it will not alter the contract state.

### Function Types: view, pure

In `Solidity`, there are three types of function modifiers: `view`, `pure`, and regular functions. Using these modifiers appropriately can optimize the code effectively:

- **view functions**: can **read** state variables in the contract but **cannot modify** them. For example, our `getTask` function is a view function, as it only reads task data without changing it.
- **pure functions**: purely computational and **do not read or modify state variables**. For instance, a simple addition function `add(uint x, uint y) pure returns (uint)` could be defined.
- **Regular functions**: which lack `view` or `pure` modifiers, **can read and modify state variables**. The `createTask` function, which creates tasks, is a typical regular function.

Understanding and using appropriate modifiers can improve code readability and clarify a function's intended purpose for developers.

### Auto-generated Getter Functions

In `Solidity`, if a state variable is set as `public`, the compiler will automatically generate a `Getter` function, making it easy to retrieve the variable’s value. For example:

```solidity
mapping(uint256 => Task) public tasks;
```

In the code above, the `tasks` mapping is defined as `public`, so the `Solidity` compiler will automatically generate a `tasks(uint256)` view function, allowing us to directly retrieve task details by `id`.

Thus, for instructional purposes, even though the contract already has an auto-generated `tasks(uint256)` query function, this section includes the `getTask` function. The main goal is to familiarize you with the steps of manually writing query functions, laying a foundation for developing more complex query interfaces.

## Summary

In this section, we implemented task querying functionality.

In upcoming tutorials, we will further explore how to interact with the contract by calling query functions via `RPC`, adding more dynamic query capabilities to the application.

## Additional Resources

- [Solidity by Example](https://solidity-by-example.org/)
