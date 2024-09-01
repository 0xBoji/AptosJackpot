const getPrice = async () => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=usd'
	);
	const data = await response.json();
	return data['aptos']['usd'] as number;
};

export default getPrice;
