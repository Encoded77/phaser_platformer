import SceneBase from '../SceneBase';
import { SCENES } from '../../utils/constants';

const gameOverChoices = [{
    text: `GAME OVER! Replay ?`,
    callback: (ctx) => ctx.scene.start(SCENES.organizer.name),
}];

class GameOver extends SceneBase {
    create(): void {
        console.log('[GameOver] create');
        const { width, height } = this.scale;
        this.createMenu({
            x: width * 0.20,
            y: height * 0.22,
            choices: gameOverChoices,
        });
    }
}

export default GameOver;
