import * as PIXI from 'pixi.js';
import titleContainer from './title';

export default (app: PIXI.Application) => {
    const jackpotContainer = new PIXI.Container();
    jackpotContainer.addChild(titleContainer);

    app.stage.addChild(jackpotContainer);
};
