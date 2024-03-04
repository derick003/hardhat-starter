import { ethers } from "hardhat";
import { readJson, deployContract, executeTx } from "./utils";

async function main() {
    const [deployer] = await ethers.getSigners();

    await deployContract("Lock", "lockImpl", deployer, null, [])
    const path = "config/contracts.json";
    const contracts = readJson(path);
    await executeTx("ProxyAdmin", contracts.proxyAdmin.address, "upgrade", "0", deployer, [
        contracts.lock.address,
        contracts.lockImpl.address
    ])

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
