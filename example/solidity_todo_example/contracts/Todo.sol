// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Todo {
    struct Task {
        uint256 id;
        uint256 date;
        string content;
        bool done;
        uint256 dateComplete;
    }

    event TaskCreated(uint256 id, uint256 date, string content, bool done);

    event TaskStatusToggled(uint256 id, bool done, uint256 dateComplete);

    event TaskDeleted(uint256 id);

    // Task[] tasks;
    // this consume gas when loop through entries in getTask
    // so list should be avoided
    mapping(uint256 => Task) public tasks;

    // mapping default uint value is 0 when key missing
    // therefore avoid initialize with default value
    // (otherwise modifier taskExists will not work)
    uint256 public nextTaskId = 1;
    uint256[] public taskIds;

    function createTask(string memory _content) public {
        uint256 theNow = block.timestamp;

        tasks[nextTaskId] = Task(nextTaskId, theNow, _content, false, 0);
        taskIds.push(nextTaskId);

        emit TaskCreated(nextTaskId, theNow, _content, false);
        nextTaskId++;
    }

    function toggleDone(uint256 id) public taskExists(id) {
        Task storage task = tasks[id];
        task.done = !task.done;
        task.dateComplete = task.done ? block.timestamp : 0;

        emit TaskStatusToggled(id, task.done, task.dateComplete);
    }

    function getTask(uint256 id) public view taskExists(id) returns (Task memory task){
        task = tasks[id];
    }

    // clear each data (you cannot delete mapping in Solidity)
    // https://stackoverflow.com/questions/48515633
    function deleteTask(uint256 id) public taskExists(id) {
        delete tasks[id];

        for (uint256 i = 0; i < taskIds.length; i++) {
            if (taskIds[i] == id) {
                // this update the element to 0
                delete taskIds[i];
            }
        }

        emit TaskDeleted(id);
    }

    modifier taskExists(uint256 id) {
        if (tasks[id].id == 0) {
            revert("Revert: taskId not found");
        }
        _;
    }
}