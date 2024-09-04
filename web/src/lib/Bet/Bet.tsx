import { useEffect, useState } from 'react';
import JackpotAmount from '../JackpotAmount/JackpotAmount';
import './Bet.css';
import createClient from '../web3/createClient';
import { Aptos } from '@aptos-labs/ts-sdk';
import getJackpotAmount from '../web3/getJackpotAmount';
import parseNumericInput from '../scripts/parseNumericInput';
import toLocaleString from '../scripts/toLocaleString';

function Bet() {
  const [aptosClient, setAptosClient] = useState<Aptos>();
  const [jackpotAmount, setJackpotAmount] = useState(0);
  const [jackpotAmountReadable, setJackpotAmountReadable] = useState(0);
  const [maxBet, setMaxBet] = useState(0);
  const [maxBetReadable, setMaxBetReadable] = useState(0);
  const [value, setValue] = useState('');
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    setAptosClient(createClient());
  }, []);

  useEffect(() => {
    if (aptosClient) {
      getJackpotAmount(aptosClient).then((amount) => setJackpotAmount(amount));

      const intervalId = setInterval(() => {
        getJackpotAmount(aptosClient).then((amount) => setJackpotAmount(amount));
      }, 5000);

      return () => clearInterval(intervalId);
    }
  });

  useEffect(() => {
    setJackpotAmountReadable(jackpotAmount / 10 ** 8);
    setMaxBet(jackpotAmount / 10);
    setMaxBetReadable(jackpotAmount / 10 ** 8 / 10);
  }, [jackpotAmount]);

  useEffect(() => {
    setBetAmount(parseFloat(value) * 10 ** 8);
  }, [value]);

  useEffect(() => {
    if (betAmount > maxBet) {
      setValue(maxBetReadable.toString());
    }
  }, [betAmount, maxBet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseNumericInput(e.target.value, 8));
  };

  return (
    <div className="bet">
      <div className="card">
        <div className="jackpot">
          <JackpotAmount jackpotAmount={jackpotAmountReadable} />
        </div>

        <div className="display">
          <div>
            <p>Bet Amount (APTOS)</p>
          </div>

          <div>
            <input type="text" value={value} onChange={handleChange} />
          </div>
        </div>

        <div className="display">
          <div>
            <p>Win Chance</p>
          </div>

          <div>
            <p>
              <span className="number">
                {(betAmount == 0 || isNaN(betAmount)) && <>-</>}
                {betAmount != 0 && !isNaN(betAmount) && (
                  <>{toLocaleString((betAmount / (jackpotAmount * 2)) * 100, 3)}</>
                )}
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
              <span className="number">{toLocaleString(maxBetReadable)}</span> APTOS
            </p>
          </div>
        </div>

        <button> Bet </button>
      </div>
    </div>
  );
}

export default Bet;
