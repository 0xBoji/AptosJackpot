import { useEffect, useState } from 'react';
import JackpotAmount from '../JackpotAmount/JackpotAmount';
import './Bet.css';
import createClient from '../web3/createClient';
import { Aptos, InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import getJackpotAmount from '../web3/getJackpotAmount';
import parseNumericInput from '../scripts/parseNumericInput';
import toLocaleString from '../scripts/toLocaleString';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { JACKPOT_OBJECT, MODULE_ADDRESS, MODULE_NAME } from '../web3/constants';
import hasWon from '../scripts/hasWon';

function Bet() {
  const [aptosClient, setAptosClient] = useState<Aptos>();
  const [jackpotAmount, setJackpotAmount] = useState(0);
  const [jackpotAmountReadable, setJackpotAmountReadable] = useState(0);
  const [maxBet, setMaxBet] = useState(0);
  const [maxBetReadable, setMaxBetReadable] = useState(0);
  const [value, setValue] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const { account, signAndSubmitTransaction } = useWallet();
  const [result, setResult] = useState<null | string>(null);

  useEffect(() => {
    setAptosClient(createClient());
  }, []);

  const getJackpot = () => aptosClient && getJackpotAmount(aptosClient).then((amount) => setJackpotAmount(amount));

  useEffect(() => {
    if (aptosClient) {
      getJackpot();

      const intervalId = setInterval(() => {
        getJackpot();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betAmount, maxBet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseNumericInput(e.target.value, 8));
  };

  const bet = async () => {
    const transaction: InputGenerateTransactionPayloadData = {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::play`,
      functionArguments: [JACKPOT_OBJECT, betAmount],
    };

    try {
      const response = await signAndSubmitTransaction({ data: transaction });
      const result = await aptosClient?.waitForTransaction({ transactionHash: response.hash });
      console.log(result);

      if (result) {
        getJackpot();
        if (hasWon(result)) {
          setResult('You have won!');
        } else {
          setResult('You have lost ):');
        }
      }
    } catch (e) {
      console.log(e);
    }
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

        {account === null && <WalletSelector />}
        {account !== null && <button onClick={bet}> Bet </button>}

        {result !== null && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default Bet;
