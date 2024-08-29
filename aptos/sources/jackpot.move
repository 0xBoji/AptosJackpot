module jackpot_address::jackpot {
    use 0x1::signer;
    use 0x1::coin::{Self, Coin};
    use 0x1::aptos_coin::AptosCoin;
    use 0x1::randomness;
    use 0x1::object::{Self, Object, ObjectGroup};

    struct Jackpot has key {
        value: Coin<AptosCoin>,
        bets: u64
    }

    #[resource_group_member(group = ObjectGroup)]
    struct ObjectController has key {
        extend_ref: object::ExtendRef,
    }

    #[view]
    public fun get_jackpot_amount(jackpot: Object<Jackpot>): u64 acquires Jackpot {
        let constructor_ref = object::object_address<Jackpot>(&jackpot);

        let jackpot = borrow_global<Jackpot>(constructor_ref);
        coin::value(&jackpot.value) / 10 * 3
    }

    public entry fun initialize(owner: &signer){
        let constructor_ref = object::create_object(@jackpot_address);
        let object_signer = object::generate_signer(&constructor_ref);

        let zero_balance = coin::zero<AptosCoin>();
        move_to(&object_signer, Jackpot { 
            value: zero_balance,
            bets: 0
        });

        let extend_ref = object::generate_extend_ref(&constructor_ref);
        move_to(&object_signer, ObjectController { extend_ref });
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
        let player_acc_balance:u64 = coin::balance<AptosCoin>(player_address);

        assert!(amount <= player_acc_balance, 2);
        assert!(amount >= 1, 3);
        let object_address = object::object_address(&jackpot);
        let jackpot = borrow_global_mut<Jackpot>(object_address);
        let jackpot_amount = coin::value(&jackpot.value) / 10 * 3;
        assert!(amount <= jackpot_amount / 10, 4);

        if ((randomness::u64_integer() % jackpot_amount) < (amount / 2)) {
            let coin_to_send = coin::extract<AptosCoin>(&mut jackpot.value, jackpot_amount);
            coin::deposit<AptosCoin>(player_address, coin_to_send);
            return ()
        };

        let payment = coin::withdraw<AptosCoin>(player, amount);
        coin::merge<AptosCoin>(&mut jackpot.value, payment);
    }
}