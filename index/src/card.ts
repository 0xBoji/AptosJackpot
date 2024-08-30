import * as PIXI from 'pixi.js';
import border28 from './borders/border28';

const card = async (width: number, children: PIXI.ContainerChild[]) => {
    const container = new PIXI.Container();
    container.width = width;

    const border = await border28(width);

    container.addChild(border);

    for (let i = 0; i < children.length; i++) {
        container.addChild(children[i]);
    }

    // at last
    border.height = container.height + 10;

    return container;
};

export default card;
