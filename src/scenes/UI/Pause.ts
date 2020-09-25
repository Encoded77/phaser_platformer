import SceneBase from '../SceneBase';
import { SCENES } from '../../utils/constants';

const pauseChoices = [{
    text: `Continue`,
    callback: (ctx) => {
        ctx.scene.resume(SCENES.level.name);
        ctx.scene.stop(SCENES.pause.name);
    },
}, {
    text: `Restart`,
    callback: (ctx) => {
        ctx.scene.stop(SCENES.level.name);
        ctx.scene.stop(SCENES.score.name);
        ctx.scene.stop(SCENES.organizer.name);
        ctx.scene.stop(SCENES.pause.name);
        ctx.scene.start(SCENES.organizer.name, { level: 1 });
    },
}, {
    text: `Main Menu`,
    callback: (ctx) => {
        ctx.scene.stop(SCENES.level.name);
        ctx.scene.stop(SCENES.score.name);
        ctx.scene.stop(SCENES.organizer.name);
        ctx.scene.stop(SCENES.pause.name);
        ctx.scene.start(SCENES.mainMenu.name);
    },
}];

class Pause extends SceneBase {
    create(): void {
        console.log('[Pause] create');
        const { width, height } = this.scale;
        const background = this.add.graphics();
        background.fillStyle(0x000000, 0.3);
        background.fillRect(0, 0, width, height);
        this.createMenu({
            x: width * 0.22,
            y: height * 0.22,
            choices: pauseChoices,
        });

        this.scene.pause(SCENES.level.name);
    }
}

export default Pause;
