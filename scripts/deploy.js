async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ContractFactory = await ethers.getContractFactory("Twitter");
  const Twitter = await ContractFactory.deploy();

  console.log("Tweeter Contract address:", Twitter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

