import SceneBase from '../SceneBase';
import { SCENES } from '../../utils/constants';

const winChoices = [{
    text: `YOU WIN! Replay ?`,
    callback: (ctx) => ctx.scene.start(SCENES.organizer.name),
}];

class Win extends SceneBase {
    create(): void {
        console.log('[Win] create');
        const { width, height } = this.scale;
        this.createMenu({
            x: width * 0.20,
            y: height * 0.22,
            choices: winChoices,
        });
    }
}

export default Win;
