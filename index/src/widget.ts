import * as PIXI from 'pixi.js';

export default (app: PIXI.Application) => {
    const widgetContainer = new PIXI.Container();

    app.stage.addChild(widgetContainer);
};
