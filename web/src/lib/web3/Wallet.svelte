<script lang="ts">
	import { Network } from '@aptos-labs/ts-sdk';
	import { WalletCore } from '@aptos-labs/wallet-adapter-core';
	import { onMount } from "svelte";

    let show = false;

    onMount(() => {
        show = true;

        const walletCore = new WalletCore([], [], {
            network: Network.DEVNET
        });

        console.log(walletCore);
    })
</script>


{#if show}
    <slot />
{/if}