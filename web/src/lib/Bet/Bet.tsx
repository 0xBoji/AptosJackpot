import JackpotAmount from '../JackpotAmount/JackpotAmount';
import './Bet.css';

function Bet() {
  return (
    <div className="bet">
      <div className="card">
        <div className="jackpot">
          <JackpotAmount />
        </div>

        <div className="display">
          <div>
            <p>Bet Amount (APTOS)</p>
          </div>

          <div>Text Input!</div>
        </div>

        <div className="display">
          <div>
            <p>Win Chance</p>
          </div>

          <div>
            <p>
              <span className="number">
                {/* {#if betAmount == 0 || isNaN(betAmount)}
                          -
                      {:else}
                          {toLocaleString((betAmount / (jackpotAmountReadable * 2)) * 100, 3)}
                      {/if} */}
              </span>
              %
            </p>
          </div>
        </div>

        <div className="display">
          <div>
            <p>Max Bet</p>
          </div>

          <div>
            <p>
              {/* <span className="number">{toLocaleString(maxBetReadable)}</span> */}
              APTOS
            </p>
          </div>
        </div>

        <button> Bet </button>
      </div>
    </div>
  );
}

export default Bet;
