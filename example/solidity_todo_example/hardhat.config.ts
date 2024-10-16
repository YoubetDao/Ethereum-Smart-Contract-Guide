import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      // 指定 RPC, 用于与区块链节点通信: 获取链上信息, 广播合约部署交易
      url: "https://rpc.sepolia.org",

      // 指定私钥, 用来签名部署合约的交易 (注意, 请不要在其他地方使用这个私钥)
      accounts: ["0x9639c7fbbb91b804bf223d3c0c47d38a37cfc59dd8a5b13d0697bbe51ad03e21"]
    }
  },
};

export default config;
