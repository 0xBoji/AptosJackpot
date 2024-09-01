<script lang="ts">
	import { onMount } from 'svelte';
	import getPrice from './scripts/getPrice';

	let aptosPrice = 0;
	let jackpotAmount = 5789436345;
	$: jackpotAmountReadable = jackpotAmount / 10 ** 8;

	onMount(() => {
		(async () => {
			aptosPrice = await getPrice();
		})();
	});
</script>

<p class="foretitle">Jackpot</p>
<h1>
	<span class="number">{jackpotAmountReadable.toLocaleString()}</span>
	APTOS
</h1>
<p>
	≈ {(366.76).toLocaleString()} USD
</p>

<style>
	* {
		text-align: center;
		margin: 0;
	}

	.foretitle {
		font-size: 1.6rem;
	}

	h1 {
		color: #ffd700;
		font-size: 2.3rem;
	}
</style>
