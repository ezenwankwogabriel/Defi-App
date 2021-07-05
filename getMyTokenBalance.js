const MyToken = artifacts.require("MyToken");
const FarmToken = artifacts.require("FarmToken");

module.exports = async (callback) => {
  accounts = await web3.eth.getAccounts()
  myToken = await MyToken.deployed();
  farmToken = await FarmToken.deployed();
  balance = await myToken.balanceOf(farmToken.address);
  console.log(web3.utils.fromWei(balance.toString()));

  // get remaining number of tokens that spender (FarmToken contract) is allowed to spend on behalf of owner (accounts[0]) (use approve/transferFrom to change this value)
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  );
  console.log(
    "Amount of myToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  );

  // To allow the smart contract (FarmToken) to transfer to MyToken (ERC-20) on the accounts[0] behalf
  // allow farmToken to transfer x amount of myToken of our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"));

  // validate farmToken can now move x amount of myToken on our behalf
  const allowanceAfter = await myToken.allowance(
    accounts[0],
    farmToken.address
  );
  console.log(
    "Amount of myToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  );

  // verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0]);
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address);
  console.log("*** My Token ***");
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  );
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  );

  console.log("*** Farm Token ***");
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0]);
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address);
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  );
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  );


  // Call Withdraw function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))


  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  callback();

};
