import { writeFile } from "fs/promises";
import dotenv from "dotenv";
import esMain from "es-main";
import { deployAndVerify } from "./contract.mjs";

dotenv.config({
  path: `.env.${process.env.CHAIN}`,
});

export async function deployMinter(
  _cre8orAddress,
  _erc6551Registry,
  _erc6551AccountImplementation,
  _referralFee
) {
  console.log("deploying smart wallet minter");
  const contractLocation = "src/SmartWalletMinter.sol:SmartWalletMinter";
  const args = [];
  const contract = await deployAndVerify(contractLocation, args);
  const contractAddress = contract.deployed.deploy.deployedTo;
  console.log("deployed smart wallet minter to ", contractAddress);
  return contract.deployed;
}

async function main() {
  const output = await deployMinter();
  const date = new Date().toISOString().slice(0, 10);
  writeFile(
    `./deployments/${date}.${process.env.CHAIN}.json`,
    JSON.stringify(output, null, 2)
  );
}

if (esMain(import.meta)) {
  // Run main
  await main();
}
