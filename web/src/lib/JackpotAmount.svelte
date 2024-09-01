<script lang="ts">
	let jackpotAmount = 5789436345;
	$: jackpotAmountReadable = jackpotAmount / 10 ** 8;
</script>

<p>Current jackpot</p>
<h1>
	{jackpotAmountReadable.toLocaleString()} APTOS
</h1>
<p>
	≈ {(366.76).toLocaleString()} USD
</p>

<style>
	* {
		text-align: center;
		margin: 0;
	}
</style>
