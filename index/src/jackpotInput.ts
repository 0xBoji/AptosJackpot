import { Input } from '@pixi/ui';
import * as PIXI from 'pixi.js';
import border12 from './borders/border12';

const jackpotInput = async () => {
    const container = new PIXI.Container();

    let input = new Input({
        bg: (await border12(200)) as unknown as PIXI.Sprite,
        padding: [6, 6, 16, 6],
        textStyle: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            fontSize: 32,
        },
    });
    input.width = 200;
    input.height = 40;
    input.onChange.connect((e) => console.log(e));

    container.addChild(input);
    container.y = 140;
    container.x = 110;

    let betAmount = new PIXI.Text({
        text: 'Bet amount',
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            align: 'center',
            fontSize: 16,
        },
    });
    betAmount.y = 120;
    betAmount.anchor = 0.5;
    betAmount.x = 147;

    let chance = new PIXI.Text({
        text: '1.543534% chance',
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            align: 'center',
            fontSize: 12,
        },
    });
    chance.y = 180;
    chance.anchor = 0.5;
    chance.x = 133;

    return [container, betAmount, chance];
};

export default jackpotInput;
