# 创建任务

## 关于本节

在本小节中，我们将继续完善 `TodoList` 合约，添加创建任务的功能。我们将学习如何在 Solidity 中使用结构体（struct）和映射（mapping），以及如何编写函数来实现合约的逻辑。

## 定义结构体

我们需要定义一个结构体来表示任务。结构体允许我们将多个相关的数据组合在一起，方便管理和使用任务的多个属性。

在 `TodoList` 合约中，添加如下代码：

```solidity
contract Todo {
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }
}
```

### 代码逐行解释

- `struct Task`：这是定义一个名为 Task 的结构体。结构体类似于一个自定义的数据类型，包含了我们希望存储在一起的多个变量。
  - `uint256 id`：
    - **类型**：uint256 是一种无符号整数类型，表示从 0 到 2^{256} - 1 之间的整数。
	- **作用**：id 用于存储任务的唯一标识符，每个任务都有一个独一无二的 ID。
	- **为什么使用 uint256**：uint256 是 Solidity 中最大的基本整数类型，确保在极端情况下，我们也不会耗尽可用的 ID 数量。
  - `string content`：
	- **类型**：string 用于存储文本数据，即一系列字符的集合。
	- **作用**：content 存储任务的内容或描述，例如“完成 Solidity 教程”。
	- **注意事项**：字符串在 Solidity 中是动态大小的，需要谨慎操作，因为过大的字符串可能会消耗大量的 gas 费。
  - `bool completed`：
	- **类型**：bool 表示布尔值，只有两个值：true 或 false。
	- **作用**：completed 字段用于表示任务是否已完成，true 表示已完成，false 表示未完成。

通过定义这个结构体 Task，我们可以方便地将任务的各个属性（ID、内容、完成状态）组合在一起进行管理。

## 创建数据结构

为了存储和管理多个任务的状态，我们需要一种数据结构存储多个 Task 变量。在 Solidity 中，常用的数据结构有数组（array）和映射（mapping）。在这里，我们选择使用映射，因为映射可以根据键快速检索对应的值，而且键值对的数量可以动态增长，非常适合存储大量未知数量的数据。

在 Task 结构体下方，添加以下代码：

```solidity
contract Todo {
    struct Task {
        ……
    }

    mapping(uint256 => Task) public tasks;
    uint256 public nextTaskId = 1;
}
```

### 代码逐行解释

- `mapping(uint256 => Task) public tasks`：这行代码定义了一个名为 tasks 的映射，用于存储任务。
  - **`mapping(uint256 => Task)`**：映射的定义格式，其中 uint256 是键的类型，Task 是值的类型。也就是说，我们将 uint256 类型的键（任务 ID）映射到 Task 类型的值（任务结构体）。
  - **`public`**：这个关键字使得映射具有公开的可见性，Solidity 会为其自动生成一个 getter 函数，允许我们从外部访问映射中的数据。
  - **为何使用 mapping？**
    - 快速查找：映射允许我们通过键（任务 ID）直接访问对应的值（任务），查找速度快且效率高。
	- 动态大小：映射的大小不固定，可以随着我们添加新的键值对而增长，无需预先指定大小。
	- 节省 Gas 费：相比于数组，映射在处理大量数据时更为高效，因为我们不需要遍历整个数据结构来查找特定元素。
  - **`uint256 public nextTaskId = 1`**：这是一个用于追踪下一个任务 ID 的状态变量。
    - uint256：变量的类型，无符号整数。
	- public：公开可见性，可以从外部读取该变量的值。
	- nextTaskId = 1：初始化变量为 1，第一个任务的 ID 从 1 开始。
  - **为何需要 nextTaskId？**
	- 唯一性：确保每个任务都有一个唯一的标识符，我们在创建新任务时，使用 nextTaskId 作为任务的 ID。
	- 自增性：每次创建新任务后，我们会递增 nextTaskId，为下一个任务准备一个新的唯一 ID。
	- 防止冲突：如果不使用自增的 ID，可能会导致多个任务拥有相同的 ID，从而引发数据冲突或覆盖。

## 创建任务的函数

我们需要编写一个函数，允许用户创建新任务。这个函数将接收任务的内容，创建一个新的 Task 结构体变量，并将其存储在 tasks 映射中。

在合约中，添加以下代码：

```solidity
function createTask(string memory _content) public {
    tasks[nextTaskId] = Task(nextTaskId, _content, false);
    nextTaskId++;
}
```

### 代码逐行解释

#### 函数定义

- `function createTask(string memory _content) public`：定义了一个名为 createTask 的公共函数，用于创建新任务。
  - **`function`**：这是定义函数的关键字。
  - **`createTask`**：函数的名称，表示创建任务。
  - **`(string memory _content)`**：函数的参数列表，包含一个参数 _content。
    - string memory _content：
	  - **类型**：string，表示参数是一个字符串。
	  - **数据位置**：memory，表示数据存储在内存中，仅在函数执行期间有效。
	  - **参数名称**：_content，这是一个常见的命名习惯，使用下划线开头表示这是一个函数参数。
	  - **为什么需要 memory？**
        在 Solidity 中，函数参数需要指定数据的位置，可以是 memory（内存）或 calldata（调用数据）。对于字符串这种动态大小的复杂数据类型，我们通常使用 memory，表示在内存中操作。
	- **`public`**：函数的可见性，表示任何人都可以调用这个函数。

#### 函数主体

- `tasks[nextTaskId] = Task(nextTaskId, _content, false);
nextTaskId++;`，创建并存储新任务
  - `tasks[nextTaskId]`：在 tasks 映射中，使用当前的 nextTaskId 作为键。
  - `=`：赋值操作符，将右侧的值赋给左侧的变量。
  - `Task(nextTaskId, _content, false)`：创建一个新的 Task 结构体变量，包含以下字段：
    - nextTaskId：任务的唯一 ID，确保每个任务都有独一无二的标识。
    - _content：任务的内容，由函数参数提供。
    - false：任务的初始完成状态，默认为未完成（false）。
- `nextTaskId++;`，更新任务 ID
  - `++`：自增运算符，将变量的值加 1。

## 小结

在本小节中，我们学习了如何在 Solidity 中使用结构体和映射来存储复杂的数据结构，并编写了一个函数来创建新任务。下一小节我们将编写完成任务的功能，并学习内存/存储的概念。

## 附加资源

1.	结构体（Structs）：深入了解 Solidity 中的结构体，请参考 [Solidity 官方文档 - 结构体](https://docs.soliditylang.org/en/latest/types.html#structs)。

2.	映射（Mappings）：了解映射的用法和特点，请参考 [Solidity 官方文档 - 映射](https://docs.soliditylang.org/en/latest/types.html#mapping-types)。

3.	函数（Functions）：学习如何编写和调用函数，请参考 [Solidity 官方文档 - 函数](https://docs.soliditylang.org/en/latest/contracts.html#functions)。