import { ethers, run } from "hardhat";

async function main() {

    await run("verify:verify", {
        address: "contract_address",
        constructorArguments: [
            "arg1"
        ]
    })
    console.log("finished");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});