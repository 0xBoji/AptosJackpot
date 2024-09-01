<script lang="ts">
	import { onMount } from 'svelte';
	import getPrice from '$lib/scripts/getPrice';
	import toLocaleString from './scripts/toLocaleString';

	let aptosPrice = 0;
	export let jackpotAmountReadable = 0;
	$: jackpotAmountUsd = jackpotAmountReadable * aptosPrice;

	onMount(() => {
		(async () => {
			aptosPrice = await getPrice();
		})();
	});
</script>

<p class="foretitle">Jackpot</p>
<h1>
	<span class="number">{toLocaleString(jackpotAmountReadable)}</span>
	APTOS
</h1>
<p>
	≈ {jackpotAmountUsd.toLocaleString()} USD
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
