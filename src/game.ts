import Phaser from 'phaser';
import { SETTINGS, SCENES } from './utils/constants';

const {
    DEFAULT_WIDTH,
    DEFAULT_HEIGHT
} = SETTINGS;

class HTMLGame extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            scale: {
                parent: 'phaser-game',
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT
            },
            physics: {
                default: 'arcade',
                arcade: {
                    // debug: true,
                    debugShowVelocity: false,
                    gravity: {
                        y: 500,
                    },
                },
            },
        });

        // Add all scenes here
        Object.entries(SCENES).map(([_, { name, classRef }]) =>
            this.scene.add(name, classRef));

        // Start the booting scene
        this.scene.start(SCENES.boot.name);
    }
}
window.addEventListener('load', () => {
  const game = new HTMLGame();
});
