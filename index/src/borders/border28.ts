import * as PIXI from 'pixi.js';
import panel_border_png from './../assets/fantasy_ui/border/panel-border-028.png';

const border28 = async (width: number) => {
    const panel_border = await PIXI.Assets.load(panel_border_png);
    const texture = new PIXI.Texture(panel_border);
    const nineSlice = new PIXI.NineSliceSprite({
        texture,
        leftWidth: 24,
        topHeight: 24,
        rightWidth: 24,
        bottomHeight: 24,
    });
    nineSlice.width = width + 20;
    nineSlice.x = -10;
    nineSlice.y = -10;

    return nineSlice;
};

export default border28;
