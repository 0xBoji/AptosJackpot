<script lang="ts">
	import { onMount } from 'svelte';
	import JackpotAmount from './JackpotAmount.svelte';
	import createClient from './web3/createClient';
	import getJackpotAmount from './web3/getJackpotAmount';
	import toLocaleString from './scripts/toLocaleString';
	import parseNumericInput from './scripts/parseNumericInput';

	let value = '';
	let betAmount = 0;
	let jackpotAmount = 0;
	$: jackpotAmountReadable = jackpotAmount / 10 ** 8;
	$: maxBet = jackpotAmount / 10;
	$: maxBetReadable = jackpotAmountReadable / 10;

	onMount(() => {
		const aptos = createClient();
		getJackpotAmount(aptos).then((am) => (jackpotAmount = am));

		const intervalId = setInterval(
			() => getJackpotAmount(aptos).then((am) => (jackpotAmount = am)),
			5000
		);
		return () => clearInterval(intervalId);
	});

	const handle = () => {
		value = parseNumericInput(value, 8);
		betAmount = parseFloat(value);

		if (betAmount > maxBetReadable) {
			betAmount = maxBet;
			value = maxBetReadable.toString();
			handle();
		}
	};
</script>

<div class="bet">
	<div class="card">
		<div class="jackpot">
			<JackpotAmount {jackpotAmountReadable} />
		</div>

		<div class="display">
			<div>
				<p>Bet Amount (APTOS)</p>
			</div>

			<div>
				<input type="text" on:keyup={handle} bind:value placeholder="Ex. 5.55" />
			</div>
		</div>

		<div class="display">
			<div>
				<p>Win Chance</p>
			</div>

			<div>
				<p>
					<span class="number">
						{#if betAmount == 0 || isNaN(betAmount)}
							-
						{:else}
							{toLocaleString((betAmount / (jackpotAmountReadable * 2)) * 100, 3)}
						{/if}
					</span>
					%
				</p>
			</div>
		</div>

		<div class="display">
			<div>
				<p>Max Bet</p>
			</div>

			<div>
				<p>
					<span class="number">{toLocaleString(maxBetReadable)}</span>
					APTOS
				</p>
			</div>
		</div>

		<button> Bet </button>
	</div>
</div>

<style lang="scss">
	* {
		margin: 0;
	}

	div.jackpot {
		padding-bottom: 40px;
	}

	.bet {
		padding-top: 40px;
	}

	div.card {
		background: #007bff;
		max-width: 300px;
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}

	input {
		width: 100%;
		height: 25px;
		font-size: 18px;
		font-family: 'Tiny5', sans-serif;
		text-align: right;
	}

	button {
		background: #39ff14;
		width: 100%;
		height: 30px;
		border: 0;
		margin-top: 20px;
		cursor: pointer;
		font-family: 'Pixelify Sans', system-ui;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	}

	div.display {
		display: flex;
		align-items: center;
		gap: 2rem;
		height: 30px;

		& > div:last-child {
			flex: 1;

			p {
				text-align: right;
			}
		}
	}
</style>
