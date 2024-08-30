import * as PIXI from 'pixi.js';
import titleContainer from './title';

export default async (app: PIXI.Application) => {
    const jackpotContainer = new PIXI.Container();
    jackpotContainer.addChild(await titleContainer('Aptos Jackpot'));

    app.stage.addChild(jackpotContainer);
};
