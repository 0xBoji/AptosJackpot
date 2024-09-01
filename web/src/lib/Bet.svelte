<script lang="ts">
	import JackpotAmount from './JackpotAmount.svelte';
</script>

<div class="bet">
	<div class="card">
		<div class="jackpot">
			<JackpotAmount />
		</div>

		<div class="display">
			<div>
				<p>Bet Amount</p>
			</div>

			<div>
				<input type="text" />
			</div>
		</div>

		<div class="display">
			<div>
				<p>Win Chance</p>
			</div>

			<div>
				<p>
					<span class="number">0.05</span>
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
					<span class="number">0.5</span>
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
