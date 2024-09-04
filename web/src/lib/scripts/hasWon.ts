import { CommittedTransactionResponse, UserTransactionResponse } from '@aptos-labs/ts-sdk';
import { MODULE_ADDRESS, MODULE_NAME } from '../web3/constants';

const hasWon = (e: CommittedTransactionResponse): e is UserTransactionResponse => {
  if ('events' in e) {
    const result = e.events.filter((ev) => ev.type.startsWith(`${MODULE_ADDRESS}::${MODULE_NAME}::`))[0];
    if (result.type.includes('Win')) {
      return true;
    }
  }

  return false;
};

export default hasWon;
