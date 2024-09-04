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
import addressReadable from '../scripts/addressReadable';

type WinEvent = {
  who: string;
  amount: number;
};

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
  const [lastWins, setLastWins] = useState<WinEvent[]>([]);

  useEffect(() => {
    setAptosClient(createClient());
  }, []);

  const getJackpot = () => {
    if (aptosClient) {
      getJackpotAmount(aptosClient).then((amount) => setJackpotAmount(amount));

      aptosClient
        .getModuleEventsByEventType({
          eventType: `${MODULE_ADDRESS}::${MODULE_NAME}::Win`,
          options: {
            limit: 3,
            orderBy: [
              {
                transaction_block_height: 'desc',
              },
            ],
          },
        })
        .then((events) => setLastWins(events.map((e) => ({ who: e.data.by, amount: parseInt(e.data.amount) }))));
    }
  };

  useEffect(() => {
    if (aptosClient) {
      getJackpot();

      const intervalId = setInterval(() => {
        getJackpot();
      }, 5000);

      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aptosClient]);

  useEffect(() => {
    setJackpotAmountReadable(jackpotAmount / 10 ** 8);
    setMaxBet(Math.floor(jackpotAmount / 10));
  }, [jackpotAmount]);

  useEffect(() => {
    setMaxBetReadable(maxBet / 10 ** 8);
  }, [maxBet]);

  useEffect(() => {
    setBetAmount(parseFloat(value) * 10 ** 8);
  }, [value]);

  useEffect(() => {
    console.log(maxBetReadable);
    if (betAmount > maxBet) {
      setValue(maxBetReadable.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betAmount, maxBet]);

  useEffect(() => {
    console.log(lastWins);
  }, [lastWins]);

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
                  <>{toLocaleString((betAmount / (jackpotAmount * 10)) * 100, 3)}</>
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

      {lastWins.length > 0 && (
        <div className="card">
          <h2>Last {lastWins.length} wins</h2>

          {lastWins.map((win) => (
            <div className="win">
              <a href={`https://explorer.aptoslabs.com/account/${win.who}?network=mainnet`} target="_blank">
                <span className="who">{addressReadable(win.who)}</span> won{' '}
                <span className="number">{toLocaleString(win.amount / 10 ** 8)}</span> APTOS
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bet;
