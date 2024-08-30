import * as PIXI from 'pixi.js';

const jackpotInfo = async () => {
    let currently = new PIXI.Text({
        text: 'Currently',
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            align: 'center',
            fontSize: 20,
        },
    });
    currently.y = 20;
    currently.anchor = 0.5;
    currently.x = 200;

    let amount = new PIXI.Text({
        text: `${(11000).toLocaleString()} APTOS`,
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            align: 'center',
            fontSize: 30,
        },
    });
    amount.y = 45;
    amount.anchor = 0.5;
    amount.x = 200;

    let subText = new PIXI.Text({
        text: 'in Jackpot',
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            align: 'center',
            fontSize: 20,
        },
    });
    subText.y = 70;
    subText.anchor = 0.5;
    subText.x = 200;

    return [currently, amount, subText];
};

export default jackpotInfo;
