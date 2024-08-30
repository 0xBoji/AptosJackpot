import * as PIXI from 'pixi.js';
import jackpotContainer from './jackpot';
import FontFaceObserver from 'fontfaceobserver';

const app = new PIXI.Application();
const el: HTMLDivElement = document.querySelector('.wrapper') as HTMLDivElement;

const initializeApp = async () => {
    await app.init({ background: '#1099bb', resizeTo: el });
    await new FontFaceObserver('Pixelify Sans').load();
    el.appendChild(app.canvas);

    jackpotContainer(app);
};

if (!window.__PIXILOADED) {
    window.__PIXILOADED = true; // Prevent multiple initializations while developing
    initializeApp();
}

declare global {
    interface Window {
        __PIXILOADED?: boolean;
    }
}
