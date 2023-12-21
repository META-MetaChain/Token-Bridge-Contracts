import './tasks/peripheralsTasks'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import 'dotenv/config'
import 'solidity-coverage'
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-deploy'
import 'hardhat-contract-sizer'

import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'

task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})

const config = {
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: 'build/contracts',
  },
  solidity: {
    compilers: [
      {
        version: '0.6.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
    overrides: {},
  },
  networks: {
    hardhat: {
      chainId: 1337,
      throwOnTransactionFailures: true,
      allowUnlimitedContractSize: true,
      accounts: {
        accountsBalance: '1000000000000000000000000000',
      },
      blockGasLimit: 200000000,
      // mining: {
      //   auto: false,
      //   interval: 1000,
      // },
      forking: {
        url: 'https://mainnet.infura.io/v3/' + process.env['INFURA_KEY'],
        enabled: process.env['SHOULD_FORK'] === '1',
      },
    },
    local_development: {
      url: 'http://127.0.0.1:7545',
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/' + process.env['INFURA_KEY'],
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/' + process.env['INFURA_KEY'],
      accounts: process.env['MAINNET_PRIVKEY']
        ? [process.env['MAINNET_PRIVKEY']]
        : [],
    },
    fork: {
      url: 'http://127.0.0.1:8545/',
    },
    metachain1: {
      url: 'https://META1.metachain-i.co/rpc',
      accounts: process.env['MAINNET_PRIVKEY']
        ? [process.env['MAINNET_PRIVKEY']]
        : [],
    },
    nova: {
      url: 'https://nova.metachain-i.co/rpc',
      accounts: process.env['MAINNET_PRIVKEY']
        ? [process.env['MAINNET_PRIVKEY']]
        : [],
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/' + process.env['INFURA_KEY'],
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    METARinkeby: {
      url: 'https://rinkeby.metachain-i.co/rpc',
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/' + process.env['INFURA_KEY'],
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/' + process.env['INFURA_KEY'],
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    METAGoerliRollup: {
      url: 'https://goerli-rollup.metachain-i.co/rpc',
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    METASepoliaRollup: {
      url: 'https://sepolia-rollup.metachain-i.co/rpc',
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
    metachain: {
      url: 'http://127.0.0.1:8547',
      gas: 999999999999999,
      accounts: {
        mnemonic:
          'jar deny prosper gasp flush glass core corn alarm treat leg smart',
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
      },
      timeout: 100000,
    },
  },
  typechain: {
    outDir: 'build/types',
    target: 'ethers-v5',
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 20,
    enabled: process.env.REPORT_GAS ? true : false,
    maxMethodDiff: 5,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  mocha: {
    timeout: 0,
    bail: true,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env['ETHERSCAN_API_KEY'],
      kovan: process.env['ETHERSCAN_API_KEY'],
      rinkeby: process.env['ETHERSCAN_API_KEY'],
      goerli: process.env['ETHERSCAN_API_KEY'],
      sepolia: process.env['ETHERSCAN_API_KEY'],
      metachainOne: process.env['metachain_API_KEY'],
      metachainTestnet: process.env['metachain_API_KEY'],
      nova: process.env['NOVA_metachain_API_KEY'],
      METAGoerliRollup: process.env['metachain_API_KEY'],
      METASepoliaRollup: 'x',
    },
    customChains: [
      {
        network: 'nova',
        chainId: 42170,
        urls: {
          apiURL: 'https://api-nova.metachain-i.co/api',
          browserURL: 'https://nova.metachain-i.co/',
        },
      },
      {
        network: 'METAGoerliRollup',
        chainId: 421613,
        urls: {
          apiURL: 'https://api-goerli.metachain-i.co/api',
          browserURL: 'https://goerli.metachain-i.co/',
        },
      },
      {
        network: 'METASepoliaRollup',
        chainId: 421614,
        urls: {
          apiURL: 'https://sepolia-explorer.metachain-i.co/api?module=contract&action=verify',
          browserURL: 'https://sepolia-explorer.metachain-i.co/',
        },
      }
    ],
  },
}

if (process.env['RINKEBY_URL'] && process.env['RINKEBY_MNEMONIC']) {
  ;(config.networks as any)['rinkeby'] = {
    url: process.env['RINKEBY_URL'] || '',
    accounts: [process.env['RINKEBY_MNEMONIC'] || ''],
    network_id: 4,
    confirmations: 1,
  }
}

if (process.env['ROPSTEN_URL'] && process.env['ROPSTEN_MNEMONIC']) {
  ;(config.networks as any)['ropsten'] = {
    url: process.env['ROPSTEN_URL'] || '',
    accounts: [process.env['ROPSTEN_MNEMONIC'] || ''],
    network_id: 3,
    confirmations: 1,
  }
}

if (process.env['KOVAN_URL'] && process.env['KOVAN_MNEMONIC']) {
  ;(config.networks as any)['kovan'] = {
    url: process.env['KOVAN_URL'] || '',
    accounts: [process.env['KOVAN_MNEMONIC'] || ''],
    network_id: 42,
    confirmations: 4,
  }
}

if (process.env['GOERLI_URL'] && process.env['GOERLI_MNEMONIC']) {
  ;(config.networks as any)['goerli'] = {
    url: process.env['GOERLI_URL'] || '',
    accounts: [process.env['GOERLI_MNEMONIC'] || ''],
    network_id: 42,
    confirmations: 4,
  }
}

if (!process.env['DEVNET_PRIVKEY']) console.warn('No devnet privkey set')

if (process.env['INTERFACE_TESTER_SOLC_VERSION']) {
  config.solidity.compilers.push({
    version: process.env['INTERFACE_TESTER_SOLC_VERSION'],
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  })
  config.solidity.overrides = {
    ...config.solidity.overrides,
    'contracts/tokenbridge/test/InterfaceCompatibilityTester.sol': {
      version: process.env['INTERFACE_TESTER_SOLC_VERSION'],
    },
  }
}

module.exports = config
