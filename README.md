# lottery-demo-app

This is a demo dApp built to be deployable on the STRATO platform. The app consists of a lottery smart contract and a react user interface. Any user can initiate the creation of a lottery contract. The user determines the number of total tickets and the price per ticket when deploying the smart contract. Various users can purchase these tickets. The lottery is closed and a winner is picked once the total number of participants is reached.

Read the [documentation](https://developers.blockapps.net/advanced/launch-a-dapp/) for more information on creating dApps using [BlockApps STRATO](http://blockapps.net/blockapps-strato-blockchain-application-development/).

## Pre-requisites
You will need the an instance of STRATO. Follow the instructions in the [STRATO getting started guide](https://github.com/blockapps/strato-getting-started) to install a local instance.

## Building
The STRATO platform expects a zip archive with the following structure:

```
.
|--\contracts
|  |--contract1.sol
|  |--contract2.sol
|--\ui
|  |--index.html
|  |--(any other static js or css files)
|--metadata.json

```

Running the following commands will generate the directory structure and the zip archive under the `build` folder.

```
cd ui
npm install
npm run build
```

The data in `metadata.json` is populated from `ui/package.json`.

This zip archive under `ui/build/app.zip` can be uploaded directly to STRATO.

## Deploying on STRATO
Perform the following steps to deploy this demo app on STRATO.
1. Access the STRATO dashboard (See [STRATO getting started](https://github.com/blockapps/strato-getting-started))
2. Create and faucet and account (a private key) to upload and sign the deployment, using the accounts tab in the STRATO management dashboard. This is only necessary if you do not already have a user account.
3. Access the `Apps` tab from the side menu
4. Click on the `Deploy` button on the upper right corner
5. Fill in the user details of the account you are using (see step 2).
6. Browse or drap and drop the `app.zip` created by the build script.
7. Hit `Upload`
8. The app should show up on the app dashboard momentarily. Click on the `Launch` button to use the lottery demo app.
