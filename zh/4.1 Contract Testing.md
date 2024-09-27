# 合约测试

## 关于本节

Solidity 智能合约开发中，**编写单元测试**是保证代码可靠性的重要环节。因为合约一旦部署无法修改，上线后发现问题将束手无策（前提是没有使用代理合约)

本节我们将介绍如何编写 Solidity 合约的测试代码，涵盖**测试代码的结构**、如何**运行测试**，以及逐步**编写测试代码**。

## 编写单元测试

### 测试代码结构 & 要素

在编写 Solidity 合约测试时，理解测试代码的基本结构是关键。Hardhat 使用了 **Mocha 测试框架**，并结合 **Chai 断言库**，帮助我们编写和组织测试代码。

**测试文件位置**:
Hardhat 的测试代码, 统一存放在 `test/` 目录下。 例如 `test/todo.ts` 。

**测试代码内容的结构**通常如下:

```
import ...

describe("Todo Contract", function () {

  this.beforeEach(() => {
    // 在每个测试前执行的初始化代码
    ...
  });

  // 合约部署和初始化
  async function deployTodo() {
    ...
    return { todo, owner };
  }

  describe("Create Task", function () {
    it("Should create task successfully", async function () {
      const { todo } = await loadFixture(deployTodo);
      // 执行代码并验证结果是否符合预期
      ...
    });
  });
});
```

在上面这段代码中，`describe` 和 `it` 被用来组织测试结构，而 `loadFixture` 则帮助我们复用合约部署的逻辑，确保每个测试在相同的状态下执行。接下来我们解释, 出现在上面这段代码中重要的知识点。

**测试代码的要素**:

- `describe`：定义测试的模块或组. 它通常是一个逻辑上的分组，用来组织相关的测试。例如，某个智能合约的所有测试用例。describe 允许嵌套, 所以, 当你测试一个合约的某个功能或场景，但有多条测试用例时, 可以使用 describe 来分组。
- `it`：定义具体的测试用例，描述预期行为和验证逻辑。例如, 在 it 中编写测试逻辑，确保某个具体功能（如函数调用）按预期运行。
- `beforeEach`：每个测试用例执行前的准备工作，常用于初始化合约或设置环境。
- `loadFixture`：提升了测试的效率的一个小技巧。在每个测试中部署合约会非常耗时，loadFixture 通过缓存这个过程，使得测试效率更高。它的参数是一个函数, 比如命名为 deployTodo 中，你定义了一个状态的初始化流程, 例如合约的部署和数据的设置。

### 运行单元测试

在编写完测试代码后，我们需要运行它来验证合约的行为。

Hardhat 提供了便捷的工具来运行测试，甚至**可以选择性地运行指定的测试用例**。(下面列举的命令, 可以在 example/solidity_todo_example 目录下尝试执行)

- 运行所有测试：使用 `yarn hardhat test` 运行项目中所有测试文件。
- 运行单个测试文件：指定文件路径运行特定测试文件，例如 `yarn hardhat test test/Todo.ts`。
- **运行特定测试用例**：使用 `--grep` 关键字过滤出想要运行的测试用例。示例命令：`yarn hardhat test --grep "Should create task successful"`。这条命令将只运行名称中包含 “Create Task” 的测试用例。**这种方式在进行调试时非常高效，尤其当你只关注特定的合约功能时**。

### 编写测试代码

接下来, 我们通过分步示例，逐步介绍如何编写测试代码。

#### 1. 部署合约

首先，我们需要部署待测试的合约。通过 Hardhat 的 `ethers.getContractFactory` 获取合约工厂，再通过 `.deploy()` 方法部署合约。

```typescript
async function deployTodo() {
	const [owner] = await hre.ethers.getSigners();
	const ToDo = await hre.ethers.getContractFactory("Todo");
	const todo = await ToDo.deploy();
	return { todo, owner };
}
```

部署完成后，我们将使用 `loadFixture` 在测试中复用这段代码，确保每次测试都从一个干净的状态开始。

#### 2. 创建任务测试

接下来，我们编写第一个测试用例，验证任务是否能成功创建。通过 `todo.createTask` 创建任务，并使用 Chai 的 `expect` 断言来确认操作是否被拒绝、是否可以根据 id 获取到新创建的 Task.

```typescript
it("Should create task successfully", async function () {
	const { todo } = await loadFixture(deployTodo);

	const nextTaskId = await todo.nextTaskId();
	const taskContent = "Write a contract of todo list";

	await expect(todo.createTask(taskContent)).to.not.be.rejected;

	const result = await todo.tasks(nextTaskId);
	expect(result.id).to.eq(nextTaskId);
	expect(result.content).to.eq(taskContent);
});
```

#### 3. 事件测试

在 `src/Todo.sol` 中，任务创建成功后应该触发 `TaskCreated` 事件。我们将编写测试，确保事件被正确触发, 并且事件参数符合预期。

```typescript
it("Should emit a TaskCreated event", async function () {
	const { todo } = await loadFixture(deployTodo);
	const taskContent = "Write a contract of todo list";
	const nextTaskId = await todo.nextTaskId();

	await expect(todo.createTask(taskContent))
		.to.emit(todo, "TaskCreated")
		.withArgs(nextTaskId, anyValue, taskContent, false);
});
```

此处使用 `anyValue` 来忽略不重要的参数（如时间戳），重点是验证事件的核心参数: 任务 ID 和内容。

以上我们展示了如何测试**任务的创建功能**。同样的思路，你可以尝试编写测试代码，验证 **toggleDone** 和 **deleteTask** 等功能是否正确，进一步巩固所学内容。完成这些练习，你将更加熟悉合约的完整测试流程。

## 小结

在本节中，我们通过 Hardhat 编写了 Solidity 合约的测试代码，了解了如何组织测试代码结构，如何运行测试命令，并通过逐步编写测试代码来验证合约行为。在测试过程中，复用部署逻辑对于保持代码整洁和提高效率非常重要。

## 附加资源

- [Mocha 官方文档](https://mochajs.org/)
- [Chai 断言库](https://www.chaijs.com/)
- [Hardhat 测试合约指南](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)
