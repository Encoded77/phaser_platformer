import SceneBase from '../SceneBase';
import { EVENTS } from '../../utils/constants';
import { flashTransparent } from '../../utils/tweens';

const textConfig = {
    fontSize: 24,
    fontFamily: 'sans-serif',
    fill: 'white'
};
let hasEvents = false;

class Score extends SceneBase {
    coins: number;
    diamonds: number;
    hearts: number;

    coinText: Phaser.GameObjects.Text;
    diamondText: Phaser.GameObjects.Text;
    heartText: Phaser.GameObjects.Text;

    coinSprite: Phaser.GameObjects.Sprite;
    diamondSprite: Phaser.GameObjects.Sprite;
    heartSprite: Phaser.GameObjects.Sprite;

    init() {
        this.coins = 0;
        this.diamonds = 0;
        this.hearts = 3;
    }

    create(): void {
        console.log('[Score] create');
        this.coinSprite = this.add.sprite(32, 32, 'coin').setScale(3);
        this.diamondSprite = this.add.sprite(32, 80, 'diamond').setScale(3);
        this.heartSprite = this.add.sprite(32, 128, 'heart').setScale(2.5);

        this.coinText = this.add.text(48, 17, `: ${this.coins}`, textConfig);
        this.diamondText = this.add.text(48, 65, `: ${this.diamonds}`, textConfig);
        this.heartText = this.add.text(48, 113, `: ${this.hearts}`, textConfig);

        if (!hasEvents) {
            this.registry.events.on(EVENTS.coinPickup, this.handleCoin, this);
            this.registry.events.on(EVENTS.diamondPickup, this.handleDiamond, this);
            this.registry.events.on(EVENTS.heartPickup, this.handleHeart, this);
            this.registry.events.on(EVENTS.death, this.handleDeath, this);
        }

        // mutating value, this is trash but it will do.
        // (doing this because registry events arent cleared on scene stop, and we dont want multiples)
        hasEvents = true;
    }

    handleCoin() {
        this.coins += 1;
        flashTransparent(this, this.coinSprite);
        this.coinText.text = `: ${this.coins}`;
    }

    handleDiamond() {
        this.diamonds += 1;
        flashTransparent(this, this.diamondSprite);
        this.diamondText.text = `: ${this.diamonds}`;
    }

    handleHeart() {
        this.hearts += 1;
        flashTransparent(this, this.heartSprite);
        this.heartText.text = `: ${this.hearts}`;
    }
    
    handleDeath() {
        this.hearts -= 1;
        flashTransparent(this, this.heartSprite);
        this.heartText.text = `: ${this.hearts}`;
        if (this.hearts < 1) {
            this.registry.events.emit(EVENTS.gameOver);
        }
    }
}

export default Score;
