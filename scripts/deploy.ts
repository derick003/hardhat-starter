import { ethers, artifacts } from "hardhat";
import { readJson, deployContract, executeTx } from "./utils";

async function main() {

  const [deployer] = await ethers.getSigners();

  const contractPath = "config/contracts.json";

  const proxyAdminArgs = {
    owner: deployer.address
  };
  await deployContract("ProxyAdmin", "proxyAdmin", deployer, proxyAdminArgs, [[proxyAdminArgs.owner]])
  await deployContract("Lock", "lock", deployer, null, [])

  // const Xxx = await artifacts.readArtifact("Xxx");
  // const iface = new ethers.Interface(Xxx.abi);
  // const xxxArgs = {
  //   name: "xxx",
  //   symbol: "xxx",
  // };
  // const data = iface.encodeFunctionData("initialize", [
  //   xxxArgs.name,
  //   xxxArgs.symbol,
  // ]);

  const contracts = readJson(contractPath)
  await executeTx("ProxyAdmin", contracts.proxyAdmin.address, "renounceOwnership", "0", deployer, [])
  console.log("finished");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
