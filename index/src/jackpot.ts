import * as PIXI from 'pixi.js';
import titleContainer from './title';
import cardContainer from './card';
import jackpotInfo from './jackpotInfo';
import jackpotInput from './jackpotInput';

export default async (app: PIXI.Application) => {
    const jackpotContainer = new PIXI.Container();

    const title = await titleContainer('Aptos Jackpot');
    jackpotContainer.addChild(title);

    const card = await cardContainer(400, [
        ...(await jackpotInfo()),
        ...(await jackpotInput()),
    ]);
    card.y = 100;
    card.x = 50;
    jackpotContainer.addChild(card);

    app.stage.addChild(jackpotContainer);
};
