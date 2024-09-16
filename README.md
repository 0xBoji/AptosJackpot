# AptosJackpot

**AptosJackpot** is a decentralized application built on the Aptos blockchain that offers a provably fair, transparent, and zero house edge jackpot system. The dApp leverages Aptos' randomness capabilities, fast transaction speeds, and secure ledger system to create a unique betting experience for users. 

With **AptosJackpot**, users can place bets on a growing jackpot, and the system ensures fairness by scaling win chances proportionally to the bet size. The smart contract is designed to keep the jackpot growing over time, making it an ongoing opportunity for all participants.

## Features
- **Provably Fair:** Uses Aptos' on-chain randomness to guarantee fair outcomes.
- **Zero House Edge:** No advantage to the house, the system is purely focused on rewarding users.
- **Scalable Betting:** Users can bet up to 10% of the current jackpot, with win chances scaling proportionally to the bet size.
  - For example, a 5% bet gives a 0.5% chance to win, and the maximum bet of 10% gives a 1% chance.
- **Reserve System:** When a user loses a bet, 30% of their bet is added to the current jackpot, and the remaining 70% goes into reserves for the next jackpot.
- **Ever-growing Jackpot:** After a jackpot is won, 30% of the reserves automatically become the next jackpot, ensuring the jackpot never ends and continues to grow over time.
- **Aptos Network:** Built on the Aptos blockchain, benefiting from fast transactions and high security.

## How It Works
1. Users can bet up to 10% of the current jackpot.
2. If a bet is placed and the user wins, the jackpot is paid out.
3. If the user loses, 30% of the bet is added to the current jackpot, and 70% goes to reserves.
4. When the jackpot is won, 30% of the reserves become the new jackpot, ensuring the cycle continues.

## Deployment
- **Website:** The dApp is accessible at [aptosjackpot.com](https://aptosjackpot.com).
- **Mainnet Deployment:** The contract is live on the Aptos mainnet.
  - **Module Address:** `0x042498bcaadd6d140d0c8e39c10185365fe4ac60a2499615ffa343e83babb05b`

## Project Structure
The repository is structured as follows:

- `aptos/`: Contains the Aptos blockchain-related smart contracts and modules.
- `web/`: The frontend code for the dApp, allowing users to interact with the system via a web interface.

## Next Steps
### Enhancements and Upcoming Features
- Improving the user interface for a more seamless experience.
- Adding more metrics and analytics on bet performance and history.
- Potentially introducing features to customize bet parameters.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## License
This project is licensed under the Apache License 2.0 License.

---

For any queries or assistance, feel free to reach out or open an issue. Happy betting!
