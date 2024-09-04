import './JackpotAmount.css';

function JackpotAmount() {
  return (
    <>
      <p className="foretitle">Jackpot</p>
      <h1>
        <span className="number">{/*toLocaleString(jackpotAmountReadable)*/}</span>
        APTOS
      </h1>
      <p>≈ {/*jackpotAmountUsd.toLocaleString()*/} USD</p>
    </>
  );
}

export default JackpotAmount;
