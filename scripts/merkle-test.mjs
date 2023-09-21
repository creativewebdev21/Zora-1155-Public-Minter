import ejs from "ejs";
import { makeTree } from "./merkle.mjs";
import { zeroPad, hexlify } from "@ethersproject/bytes";
import { parseEther } from "@ethersproject/units";
import { join } from "path";
import { writeFile } from "fs/promises";
import esMain from "es-main";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAddress } from "ethers/lib/utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function renderFromPath(path, data) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(path, data, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function makeAddress(partial) {
  return hexlify(zeroPad(partial, 20));
}

const testDataInput = [
  {
    name: "test-3-addresses",
    entries: [
      { minter: makeAddress(0x10), maxCount: 1, price: parseEther("0.01") },
      { minter: makeAddress(0x11), maxCount: 2, price: parseEther("0.01") },
      { minter: makeAddress(0x12), maxCount: 3, price: parseEther("0.01") },
    ],
  },
  {
    name: "test-2-prices",
    entries: [
      { minter: makeAddress(0x10), maxCount: 2, price: parseEther("0.1") },
      { minter: makeAddress(0x10), maxCount: 2, price: parseEther("0.2") },
    ],
  },
  {
    name: "test-max-count",
    entries: [
      { minter: makeAddress(0x10), maxCount: 2, price: parseEther("0.1") },
      { minter: makeAddress(0x10), maxCount: 2, price: parseEther("0.2") },
    ],
  },
  {
    name: "pre-mint-defient",
    entries: [
      {
        // sidneyswift.eth
        minter: getAddress("0xa061fbfa7dc7ee9f838a717e8b55fbc34641bf6e"),
        maxCount: 8,
        price: parseEther("0.15"),
      },
      {
        // katee
        minter: getAddress("0xEc11a95acA582F5ECF614695D2825b353Daf2454"),
        maxCount: 8,
        price: parseEther("0.15"),
      },
      {
        // sweetman.eth
        minter: getAddress("0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38"),
        maxCount: 8,
        price: parseEther("0.15"),
      },
      {
        // sameer
        minter: getAddress("0x45a3143dC8e28A6d73ad6c6Fd78d80a4CAA17524"),
        maxCount: 8,
        price: parseEther("0.15"),
      },
      {
        // joe
        minter: getAddress("0x9B33A23d46d18300E9fCEfa1A88d6a73D216F58D"),
        maxCount: 8,
        price: parseEther("0.15"),
      },
    ],
  },
  {
    name: "test-88-founders",
    entries: [
      { minter: makeAddress(0x100), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x101), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x102), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x103), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x104), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x105), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x106), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x107), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x108), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x109), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x110), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x111), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x112), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x113), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x114), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x115), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x116), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x117), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x118), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x119), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x120), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x121), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x122), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x123), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x124), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x125), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x126), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x127), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x128), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x129), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x130), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x131), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x132), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x133), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x134), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x135), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x136), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x137), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x138), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x139), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x140), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x141), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x142), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x143), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x144), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x145), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x146), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x147), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x148), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x149), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x150), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x151), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x152), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x153), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x154), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x155), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x156), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x157), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x158), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x159), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x190), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x161), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x162), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x163), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x164), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x165), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x166), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x167), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x168), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x169), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x170), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x171), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x172), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x173), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x174), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x175), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x176), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x177), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x178), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x179), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x180), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x181), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x182), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x183), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x184), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x185), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x196), maxCount: 1, price: parseEther("0.0") },
      { minter: makeAddress(0x187), maxCount: 1, price: parseEther("0.0") },
    ],
  },
  {
    name: "test-sweets-86-whitelisted-founder",
    entries: [
      {
        minter: getAddress("0x53b50703c199b0e379575cafe6b3d208676d0593"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x1257ea6f17f3bd82b323789cf08b79191cc82b6d"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x00d4da27dedce60f859471d8f595fdb4ae861557"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x0644161438ce1e23f050573d0e45a86b98910425"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x07e061ed6d32de342dc4026f81e79ed87ee22361"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x1891d89e6598ae763c6565de8fe679f2da76d868"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x1ed577e7756bc9b417b6cb4c77e880e761628216"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x21de2bbec05468fc41af5ef2e9e5bbff21f487b3"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x28a7849118c2ac997c24fa63e9b67d3aa3bb9001"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x2e9483d2426ea7acead4e6584463ccc62768d42f"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x344b16e9cca560d29951ec2d56f0c2f61158a603"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x419c77108b0ef4b1fa5c394ae4aece0a14f4cea5"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x56fa9263a6b02a5a1259f8d7489693c197836841"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x6f4ed5952e0a76e792e80698e9df47c477c29770"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x724c05d323ef747465e68f621a2b10edd9a84463"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x849f03acc35c6f4a861b76e1f271d217cd24b18c"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x9bfff4bb48e39a14dc945eb8707b2a6ee8fdec6d"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x9cfc48ed238190b7338db2e7ed10891197590cee"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xa5d4a2c359c958c0530e37d801e851f7b7f7d69c"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xad7b71c53fe26f6896cd3a2f0931a8ab99b4107d"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xb06de036641c6d855c6d572e1a7c8cf27d64bcd1"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xc808cb8b45257ab8e67bb87448f12128e0b2e4d0"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xcf86e52a434993ad77e9bc5673bab7f15b65165e"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xdc3c1c2126289bb2a4f5dda0c6a0c67035697719"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xe65416906b8c0936ae0463d2b45bf7090102a438"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xf9d08a28c634a5939c9f93368e438b55932e5806"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x18f2145e46e77cb0405ff9a486a194698326ee38"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x2697f24a0128f4bc44c37576152518ec6cd70924"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x7f05d5f291922ac1fcf5ad07f419791853e34da9"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x045f5c44522cd53603664b7ba3dea3928a6417d5"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x4210eee2bc528b0a846eaa016ce8167a840b8b23"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x476d8f71d85a4f2b12f6720fbd77d2e471a83b95"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x547a9fac996adf04a865f7df3f8957be4a224135"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x5ae67754420a6fbb85270b9d71ca21977d889583"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x5f8fbf2a4e4e18caddb4619635818667fc2a075b"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x6d8c6e7815da0cff6be2c152bd4f89b9d05bc416"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x8b835e35838448a8a29be15e926d99e9fb040822"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x8cd32534e41a1aec03626c9680ece89eeeb9e9b0"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x914d14e0394a8138c12f8817c063f465d1fddf61"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x959919178ceff4a7bf5a1edc653e2eb965709d97"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x9933d503916c1ce8d629667edc8de3a8149aa0c0"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x9af4f5d600253bb6dce0bfedb41f89e9b380b80b"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xdd34985900fbc5c2353c8f7db923503a19918c1d"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x06d92b5b6ae4b53fffdc8654707dfc2821e3897c"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x0849370812c98efc94af4ce2516aeee2636ced7c"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x135538daed6657644b7a90958183d760f508ba45"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x2ae7ac4d95e1bfe1172fae1c8efe9097119216cf"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x3188973471200df1da427c20d8f1ebd48ac70b3c"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x39a416a1184de3c438e6987ebbd05cb0d5699b44"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x47fcc623926d1e0df091e7d16a59abd3c93de08e"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x6eac18bb705c845ace004ac19a87521bfdca2dc6"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x7a137e2d8b77709ae76e28f7b19f493ff24eafd5"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x7bfe963c7b6c653889c83e833ad59487147aa9f3"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x8d0f88cc0f08e6d21b0cf7c3acc90e8d280fccce"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xa3f9718409ae2e9c54b889bebc3a6b2d321bfd86"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xa88fe6fa01fcc112bb2164c6e37d63395b923e5f"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xc3bfba9c3d4b07ca6b909ae491fda9cda7f7d732"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xc8113bfd005b4c2de35212ea750357002868548f"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xcd28cc2cafc7449c21d8d94c676a630b7bbb9522"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xcf3bb7ec4778eaf6214cd5ea958a355d2ec095f1"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xebccb8027e4cbbeca4147d8c5a29dddecd62c6a2"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xecce1ffa735ff743dcfa9f0a1e14d6e38d28bed2"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xa9334f7750e398ed7624d828ec584467d87dc3b0"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x0bed69761b7f28322d5ec8c7455de22f9ed5e7e7"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x1593c5e4183a7628cfa8155f2f3771fbd74dd249"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x1f562c3259b5266a1a934a4d20d22b7135d3600d"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x24fc7b0dafbd998856cfc35cbeac9aeeb53e72cb"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x43a66af60ebf2e445f12d303fe93ff6f2c8cc102"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x5a48a0b76693ccaeddb277bb44e2eb2dc672bd38"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x61083772b5b10b6214c91db6ad625ecb24a60834"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x62cfc308dc5df36a417427eb0a2e61ee9abfebbe"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x77de23d1d24ed19e5bd7f112008f423ec199fd1d"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x7f9efc77234dd34328b764d68606de972e24a510"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x80fb7c29233e824a244c9e7e96feebc671ab03d7"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0x8b7d12b2aed991ef314caff9a68228ea6adf1c65"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xa2a983f5ddb82fd04f6df101043787fd1a04322f"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xaa2ba5c877b70bac69763917d3657ca22d1c1cea"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xb0af55d6f513048cb554ee7dd3343f71a90b19cc"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xb0b9c8e79651d94b76129760c93a8f91026a9ddd"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xb37fca6f0ae248adb466096d06d15b826d07ebd7"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xb68f14521e129d469b172064fd4f3c0fc46a1644"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xba781db2a3ea4d31d9f75a79722d17262d44aabd"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xcbd38467f5811d91a053cbf63853162c66bf57e6"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xdac807e6b8a4b008643abc8451339d17c5f06f82"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xdf7e66d0316f43cf45e74aba199bbf368bb8eb0b"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xebafaca1aa8d0c93692fe368ffc35faa977fd9d9"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
      {
        minter: getAddress("0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38"),
        maxCount: 1,
        price: parseEther("0.0"),
      },
    ],
  },
  {
    name: "test-allowlist-minter",
    entries: [
      { minter: makeAddress(0x111), maxCount: 8, price: parseEther("0.15") },
      { minter: makeAddress(0x100), maxCount: 8, price: parseEther("0.15") },
      { minter: makeAddress(0x101), maxCount: 8, price: parseEther("0.15") },
      { minter: makeAddress(0x102), maxCount: 8, price: parseEther("0.15") },
    ],
  },
];

async function renderExample() {
  const testData = testDataInput.map((testDataItem) => {
    console.log(testDataItem);
    const treeResult = makeTree(testDataItem.entries);
    testDataItem.entries = treeResult.entries;
    testDataItem.root = treeResult.root;
    return testDataItem;
  });
  const testPath = join(__dirname, "../", "test/merkle", "MerkleData.sol.ejs");
  const resultPath = testPath.substring(0, testPath.length - 4);
  const render = await renderFromPath(testPath, { testData });
  await writeFile(resultPath, render);
  console.log(render);
}

if (esMain(import.meta)) {
  // Run main
  await renderExample();
}
