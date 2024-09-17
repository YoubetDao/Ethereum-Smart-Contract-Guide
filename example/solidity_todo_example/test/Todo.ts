import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { task } from "hardhat/config";

describe("Lock", function () {

  this.beforeEach(() => {

  });
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTodo() {
  
    // Contracts are deployed using the first signer/account by default
    const [owner] = await hre.ethers.getSigners();

    const ToDo = await hre.ethers.getContractFactory("Todo");
    const todo = await ToDo.deploy();

    return { todo, owner };
  }

  describe("Create Task", function () {

    it("Should create task successful", async function () {
      const { todo } = await loadFixture(deployTodo);

      const taskContent = "Write a contract of todo list";
      await expect(todo.createTask(taskContent)).to.not.be.rejected;
    });

    it("Should emit an event", async function () {
      const { todo } = await loadFixture(deployTodo);

      const taskContent = "Write a contract of todo list";
      const nextTaskId = await todo.nextTaskId();

      await expect(todo.createTask(taskContent))
          .to.emit(todo, "TaskCreated")
          // we set second param (timestamp) to anyValue, because it's not import in logic. 
          .withArgs(nextTaskId, anyValue, taskContent, false);
    });
  });
});
