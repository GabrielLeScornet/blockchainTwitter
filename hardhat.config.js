require("@nomiclabs/hardhat-waffle");
require('dotenv/config');


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ALCHEMY_PRIVATE_KEY = process.env.ALCHEMY_PRIVATE_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
/*
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_PRIVATE_KEY}`,
      accounts: [`${METAMASK_PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.4",
};

