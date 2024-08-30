import * as PIXI from 'pixi.js';
import divider_png from './assets/fantasy_ui/divider/divider-005.png';

const titleContainer = new PIXI.Container();
titleContainer.width = 500;
titleContainer.y = 40;

(async () => {
    const divider = await PIXI.Assets.load(divider_png);

    const dividerLeft = new PIXI.Sprite(divider);
    dividerLeft.height = 18;
    dividerLeft.width = 90;
    dividerLeft.x = 45;
    dividerLeft.anchor = 0.5;
    titleContainer.addChild(dividerLeft);

    let text = new PIXI.Text({
        text: 'Aptos Jackpot',
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
        },
    });
    text.y = -13;
    text.x = 130;
    dividerLeft.anchor = 0.5;
    titleContainer.addChild(text);

    const dividerRight = new PIXI.Sprite(divider);
    dividerRight.height = 18;
    dividerRight.width = 90;
    dividerRight.anchor = 0.5;
    dividerRight.x = 410;
    dividerRight.rotation = Math.PI;
    titleContainer.addChild(dividerRight);
})();

export default titleContainer;
