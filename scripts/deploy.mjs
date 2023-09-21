import { writeFile } from "fs/promises";
import dotenv from "dotenv";
import esMain from "es-main";
import { deployAndVerify } from "./contract.mjs";

dotenv.config({
  path: `.env.${process.env.CHAIN}`,
});

export async function deployMinter() {
  console.log("deploying minter");
  const contractLocation = "src/MinterMulticall.sol:MinterMulticall";
  const args = [];
  const contract = await deployAndVerify(contractLocation, args);
  const contractAddress = contract.deployed.deploy.deployedTo;
  console.log("deployed minter to ", contractAddress);
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
