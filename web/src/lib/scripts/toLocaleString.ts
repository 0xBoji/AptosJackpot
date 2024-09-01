const toLocaleString = (n: number, maximumFractionDigits = 6) =>
	n.toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits
	});
export default toLocaleString;
