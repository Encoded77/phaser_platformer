import SceneBase from '../SceneBase';
import { SCENES } from '../../utils/constants';

const mainMenuChoices = [{
    text: 'New game',
    callback: (ctx) => ctx.scene.start(SCENES.organizer.name)
}, {
    text: 'Exit',
    callback: () => console.log(3)
}];

class MainMenu extends SceneBase {
    create(): void {
        console.log('[MainMenu] create');

        const { width, height } = this.scale;
        const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'mainMenu');
        const scaleX = this.cameras.main.width / image.width;
        const scaleY = this.cameras.main.height / image.height;
        const scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        this.createMenu({
            x: width * 0.22,
            y: height * 0.22,
            choices: mainMenuChoices,
        });
    }
}

export default MainMenu;
