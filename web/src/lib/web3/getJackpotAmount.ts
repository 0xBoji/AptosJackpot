import { Aptos } from '@aptos-labs/ts-sdk';
import { JACKPOT_OBJECT, MODULE_ADDRESS, MODULE_NAME } from './constants';

const getJackpotAmount = async (client: Aptos) => {
	const result = await client.view({
		payload: {
			function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_jackpot_amount`,
			typeArguments: [],
			functionArguments: [JACKPOT_OBJECT]
		}
	});

	return result[0] as number;
};

export default getJackpotAmount;
