import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TodoModule = buildModule("TodoModule", (m) => {

  const todo = m.contract("Todo");

  return { todo };
});

export default TodoModule;
