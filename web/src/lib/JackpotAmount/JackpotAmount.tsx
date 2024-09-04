import { useEffect, useState } from 'react';
import toLocaleString from '../scripts/toLocaleString';
import './JackpotAmount.css';
import getPrice from '../scripts/getPrice';

function JackpotAmount({ jackpotAmount }: { jackpotAmount: number }) {
  const [aptosPrice, setAptosPrice] = useState(0);
  const [jackpotAmountUsd, setJackpotAmountUsd] = useState(0);

  useEffect(() => {
    getPrice().then((price) => setAptosPrice(price));
  }, []);

  useEffect(() => {
    setJackpotAmountUsd(jackpotAmount * aptosPrice);
  }, [jackpotAmount, aptosPrice]);

  return (
    <>
      <p className="foretitle">Jackpot</p>
      <h1>
        <span className="number">{toLocaleString(jackpotAmount)}</span> APTOS
      </h1>
      <p>
        ≈ <span className="number">{jackpotAmountUsd.toLocaleString()}</span> USD
      </p>
    </>
  );
}

export default JackpotAmount;
