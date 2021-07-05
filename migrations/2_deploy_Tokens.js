const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // deploy farm token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}