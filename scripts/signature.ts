import { ethers } from "hardhat";

async function main() {
    const [signer] = await ethers.getSigners();

    console.log(signer.address);

    const domain = {
        name: 'Uniswap V2',
        version: '1',
        chainId: 1,
        verifyingContract: '0x21b8065d10f73EE2e260e5B47D3344d3Ced7596E'
    };

    const types = {
        Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
        ]
    };

    const value = {
        owner: '0xC62d82201a59CAF018b4D943D775faba9Fa1048a',
        spender: ethers.ZeroAddress,
        value: ethers.parseEther("0.01"),
        nonce: 0,
        deadline: ethers.MaxUint256
    };

    const signature = await signer.signTypedData(domain, types, value)
    console.log("signature", signature);
    const splitSignature = ethers.Signature.from(signature)
    console.log("splitSignature", splitSignature);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
