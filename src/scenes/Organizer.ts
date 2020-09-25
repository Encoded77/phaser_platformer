import SceneBase from './SceneBase';
import { SCENES, EVENTS } from '../utils/constants';
import { KEYS } from '../utils/types';

let hasEvents = false;

class Organizer extends SceneBase {
    currentLevel: number;
    keys: KEYS;

    init({ level }: { level: number}) {
        this.currentLevel = level ?? 1;
    }

    create(): void {
        console.log('[Organizer] create');
        // first time is always launching on first level   
        this.scene.launch(SCENES.level.name, { id: this.currentLevel });
        this.scene.launch(SCENES.score.name);

        const keys = this.input.keyboard.addKeys({
            escape: 'ESC',
        }) as KEYS;
        this.keys = keys;

        if (!hasEvents) {
            this.sound.play('tutorialBg', { loop: true, volume: 0.2 });
            this.registry.events.on(EVENTS.nextLevel, () => {
                this.currentLevel++;
                this.nextScene();
            });
            this.registry.events.on(EVENTS.gameOver, () => {
                this.endGame('lose');
            });
            keys.escape.on('up', () => {
                const pauseScene = this.scene.get(SCENES.pause.name);
                if (!pauseScene.scene.isActive()) {
                    this.scene.launch(SCENES.pause.name);
                }
            });
        }
        // mutating value, this is trash but it will do.
        // (doing this because registry events arent cleared on scene stop, and we dont want multiples)
        // should probably have a separate events manager but heh.
        hasEvents = true;
    }

    // Either launch next level or win screen
    nextScene() {
        this.scene.stop(SCENES.level.name);
        if (this.currentLevel !== 4) {
            this.scene.launch(SCENES.level.name, { id: this.currentLevel });
        }
        if (this.currentLevel === 4) {
            this.endGame('win');
        }
    }

    endGame(type: 'win' | 'lose') {
        this.scene.stop(SCENES.level.name);
        this.currentLevel = 1;
        if (type === 'win') this.scene.start(SCENES.win.name);
        if (type === 'lose') this.scene.start(SCENES.gameOver.name);
    }
}

export default Organizer;
