import * as PIXI from 'pixi.js';
import divider_png from './assets/fantasy_ui/divider/divider-005.png';

const titleContainer = async (displayText: string) => {
    const container = new PIXI.Container();
    container.y = 40;

    const divider = await PIXI.Assets.load(divider_png);

    const dividerLeft = new PIXI.Sprite(divider);
    dividerLeft.height = 18;
    dividerLeft.width = 90;
    dividerLeft.x = 45;
    dividerLeft.anchor = 0.5;
    container.addChild(dividerLeft);

    let text = new PIXI.Text({
        text: displayText,
        style: {
            fontFamily: 'Pixelify Sans',
            fill: '#fff',
            align: 'center',
            fontSize: 32,
        },
    });
    text.x = 250;
    text.anchor = 0.5;
    container.addChild(text);

    const dividerRight = new PIXI.Sprite(divider);
    dividerRight.height = 18;
    dividerRight.width = 90;
    dividerRight.anchor = 0.5;
    dividerRight.x = 455;
    dividerRight.rotation = Math.PI;
    container.addChild(dividerRight);

    return container;
};

export default titleContainer;
