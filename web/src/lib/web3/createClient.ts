import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const createClient = () => {
  const config = new AptosConfig({ network: Network.MAINNET });
  const aptos = new Aptos(config);
  return aptos;
};

export default createClient;
