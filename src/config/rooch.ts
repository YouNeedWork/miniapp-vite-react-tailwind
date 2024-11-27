import { getRoochNodeUrl } from '@roochnetwork/rooch-sdk';

export const ROOCH_NFT_OPERATING_ADDRESS = '0x176214bed3764a1c6a43dc1add387be5578ff8dbc263369f5bdc33a885a501ae';
export const ROOCH_MINT_OPERATING_ADDRESS = [
  '0x4938919590105e18ca080eeaf39441400a4687aba0fe44ef00e136027cc54eb7',
];

export const FAUCET_TESTNET = 'https://test-faucet.rooch.network/faucet';
export const FAUCET_MAINNET = 'https://main-faucet.rooch.network/faucet';

export const ROOCH_CONFIG = {
  mainnet: {
    url: getRoochNodeUrl('mainnet'),
    variables: {
      roochOperatingAddress: ROOCH_NFT_OPERATING_ADDRESS,
      mintAddress: ROOCH_MINT_OPERATING_ADDRESS,
      btcGasAddress: 'bc1prcajaj9n7e29u4dfp33x3hcf52yqeegspdpcd79pqu4fpr6llx4sugkfjt',
      gasMarketAddress: '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3',
      faucetUrl: FAUCET_MAINNET,
      faucetAddress: '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3',
      faucetObject: '0xd5723eda84f691ae2623da79312c7909b1737c5b3866ecc5dbd6aa21718ff15d',
      BTCMemPool: 'https://mempool.space/tx/',
    },
  },
  testnet: {
    url: getRoochNodeUrl('testnet'),
    variables: {
      roochOperatingAddress: ROOCH_NFT_OPERATING_ADDRESS,
      mintAddress: ROOCH_MINT_OPERATING_ADDRESS,
      btcGasAddress: 'tb1prcajaj9n7e29u4dfp33x3hcf52yqeegspdpcd79pqu4fpr6llx4stqqxgy',
      gasMarketAddress: '0x872502737008ac71c4c008bb3846a688bfd9fa54c6724089ea51b72f813dc71e',
      faucetUrl: FAUCET_TESTNET,
      faucetAddress: '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3',
      faucetObject: '0xd5723eda84f691ae2623da79312c7909b1737c5b3866ecc5dbd6aa21718ff15d',
      BTCMemPool: 'https://mempool.space/testnet/tx/',
    },
  },
};