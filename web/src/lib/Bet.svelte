<script lang="ts">
	import JackpotAmount from './JackpotAmount.svelte';

	let balanceAmount = 58493869;
	$: balanceAmountReadable = balanceAmount / 10 ** 8;
</script>

<div class="bet">
	<div class="card">
		<div class="jackpot">
			<JackpotAmount />
		</div>

		<p>
			Balance:
			<span class="number">{balanceAmountReadable.toLocaleString()}</span>
			APTOS
		</p>

		<input type="text" />
		<div class="beneath">
			<p>
				Max:
				<span class="number">5435.54354355</span>
				APTOS
			</p>
			<p>
				<span class="number">0.05</span>
				% chance
			</p>
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
		height: 30px;
		margin-top: 20px;
		font-size: 20px;
		font-family: 'Tiny5', sans-serif;
	}

	div.beneath {
		display: flex;
		justify-content: space-between;

		& > * {
			font-size: 13px;
		}
	}

	button {
		background: #39ff14;
		width: 100%;
		max-width: 50px;
		height: 30px;
		border: 0;
		margin-top: 30px;
		cursor: pointer;
	}
</style>
