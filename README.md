# Historical Cyrpto Prices

### Prerequisites

-   [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows only)
-   [nvm](https://github.com/nvm-sh/nvm) (Linux / Mac OS)
-   A free api key for the [CryptoCompare API](https://min-api.cryptocompare.com/pricing)

### Steps to run the project locally:

1. Clone the project: `git clone git@github.com:domenicomanna/cryptoHistoricalPrices.git`
2. `cd` into the cloned directory
3. Set the correct node version (the required version is listed in `./.nvmrc`.):
    - Linux / Mac OS installation
        1. Install the required version: `nvm install VERSION`
        2. Use the version: `nvm use VERSION`
    - Windows installation
        1. Run powershell as an administrator
        2. In powershell, install the required version: `nvm install VERSION`
        3. Use the installed version: `nvm use VERSION`
4. Install dependencies: `npm install`
5. Build the program: `npm run build`
6. Create a `.env` file at the root of the project, and fill it in with the variable names present in `.env.keep`
7. If you would like to run the prject in debug mode, run the project using the IDE'S debugger (cli arguments can be edited in `.vscode/launch.json`). Otherwise, run the following command and substitute the parameters as necessary: `node ./build/index.js BTC 2022-01-02T17:05`
    - To see more information about cli arguments, type: `node ./build/index.js --help`
