module jackpot_address::jackpot {
    use 0x1::signer;
    use 0x1::coin::{Self, Coin};
    use 0x1::aptos_coin::AptosCoin;
    use 0x1::randomness;
    use 0x1::object::{Self, Object};
    use 0x1::event;

    struct Jackpot has key {
        value: Coin<AptosCoin>,
        bets: u64
    }

    #[event]
    struct Lose has store, drop {
        by: address,
        amount: u64
    }

    #[event]
    struct Win has store, drop {
        by: address,
        amount: u64
    }

    #[view]
    public fun get_bet_amount(jackpot: Object<Jackpot>): u64 acquires Jackpot {
        let constructor_ref = object::object_address<Jackpot>(&jackpot);
        borrow_global<Jackpot>(constructor_ref).bets
    }

    #[view]
    public fun get_jackpot_amount(jackpot: Object<Jackpot>): u64 acquires Jackpot {
        let constructor_ref = object::object_address<Jackpot>(&jackpot);

        let jackpot = borrow_global<Jackpot>(constructor_ref);
        coin::value(&jackpot.value) / 10 * 3
    }

    #[view]
    public fun get_max_bet_amount(jackpot: Object<Jackpot>): u64 acquires Jackpot {
        get_jackpot_amount(jackpot) / 10
    }

    public entry fun initialize() {
        let constructor_ref = object::create_object(@jackpot_address);
        let object_signer = object::generate_signer(&constructor_ref);

        let zero_balance = coin::zero<AptosCoin>();
        move_to(&object_signer, Jackpot { 
            value: zero_balance,
            bets: 0
        });
    }

    public entry fun deposit(user: &signer, jackpot: Object<Jackpot>, amount: u64) acquires Jackpot {
        let object_address = object::object_address(&jackpot);

        let jackpot_mut = borrow_global_mut<Jackpot>(object_address);
        let payment = coin::withdraw<AptosCoin>(user, amount);
        coin::merge<AptosCoin>(&mut jackpot_mut.value, payment);
    }

    #[randomness]
    entry fun play(player: &signer, jackpot: Object<Jackpot>, amount: u64) acquires Jackpot {
        let player_address = signer::address_of(player);
        let player_balance:u64 = coin::balance<AptosCoin>(player_address);
        assert!(amount <= player_balance, 2);
        assert!(amount >= 1, 3);

        let object_address = object::object_address(&jackpot);
        let jackpot = borrow_global_mut<Jackpot>(object_address);
        let jackpot_amount = coin::value(&jackpot.value) / 10 * 3;
        jackpot.bets = jackpot.bets + 1;
        assert!(amount <= jackpot_amount / 10, 4);

        let payment = coin::withdraw<AptosCoin>(player, amount);
        coin::merge<AptosCoin>(&mut jackpot.value, payment);

        if ((randomness::u64_integer() % jackpot_amount) * 6 < amount) {
            let coin_to_send = coin::extract<AptosCoin>(&mut jackpot.value, jackpot_amount + amount);
            coin::deposit<AptosCoin>(player_address, coin_to_send);

            event::emit(Win {
                by: player_address,
                amount: jackpot_amount + amount
            });
        } else {
            event::emit(Lose {
                by: player_address,
                amount: amount
            });
        };
    }
}