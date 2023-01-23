const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

async function sendTokens() {
  // Load the source account by adding the following code to your Payments.js file:

  const sourceKeys = StellarSdk.Keypair.fromSecret(
    "SAJZXJHRPJEF33XLB232CQRF7VTVRNBS4QHV5AH6YLOGUHFGIJJGFOR2"
  );

  const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

  const destinationId =
    "GDSNFSBH3V2QUQPJ357JXY242IRLN3MW4IZPP5WNT34OPWP445ZSXJNX";

  const fee = await server.fetchBaseFee();

  let transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee,
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: destinationId,
        asset: StellarSdk.Asset.native(),
        amount: "2",
      })
    )
    .setTimeout(30)
    .build();

  transaction.sign(sourceKeys);

  transaction = await server.submitTransaction(transaction);

  console.log(`Transaction successful! Hash: ${transaction.hash}`);
}
sendTokens();
