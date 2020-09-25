import SceneBase from './SceneBase';
import { EVENTS } from '../utils/constants';
import { createLevelMap } from '../utils/map';
import { playerUpdate } from '../utils/player';
import { enemyUpdate, enemyCollision } from '../utils/enemy';
import { flashRed } from '../utils/tweens';
import { debugMovement } from '../utils/debug';
import { KEYS } from '../utils/types';

const SPRING_VELOCITY = 400;
let fly = false;
let debounced = false;

class Level extends SceneBase {
    level: number;
    map: Phaser.Tilemaps.Tilemap;
    background: Phaser.Tilemaps.StaticTilemapLayer
    platforms: Phaser.Tilemaps.StaticTilemapLayer;
    decorations: Phaser.Tilemaps.StaticTilemapLayer;
    spikes: Phaser.Tilemaps.StaticTilemapLayer;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    keys: KEYS;
    spawnCoord: { x: number, y: number };
    enemies: Phaser.Physics.Arcade.Group;

    init({ id }: { id: number }) {
        this.level = id;
    }

    create(): void {
        console.log(`[Level - ${this.level}] init`);
        const {
            map,
            background,
            platforms,
            decorations,
            spikes,
            player,
            spikeGroup,
            coinGroup,
            diamondGroup,
            heartGroup,
            springGroup,
            flag,
            enemyBounds,
            enemyGroup,
        } = createLevelMap(this, `level${this.level}`);

        // Worlds bounds do not check upwards
        this.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels,
            true,
            true,
            false
        );

        // Physics && interactions
        enemyBounds?.setCollisionByProperty({ EnemyCollides: true });
        platforms.setCollisionByProperty({ collides: true });
        this.physics.add.collider(player, platforms);
        
        if (spikeGroup) {
            this.physics.add.collider(player, spikeGroup, () => {
                this.sound.play('spikeDeath');
                this.registry.events.emit(EVENTS.death);
                flashRed(this, player);
                player.setX(this.spawnCoord.x);
                player.setY(this.spawnCoord.y);
            });
        }

        if (coinGroup) {
            this.physics.add.overlap(player, coinGroup, (_, coin) => {
                this.sound.play('coinPickup', { volume: 0.5 });
                this.registry.events.emit(EVENTS.coinPickup);
                coin.destroy();
            })
        }

        if (diamondGroup) {
            this.physics.add.overlap(player, diamondGroup, (_, diamond) => {
                this.sound.play('gemPickup', { volume: 0.4 });
                this.registry.events.emit(EVENTS.diamondPickup);
                diamond.destroy();
            })
        }

        if (heartGroup) {
            this.physics.add.overlap(player, heartGroup, (_, heart) => {
                this.sound.play('heartPickup', { volume: 2 });
                this.registry.events.emit(EVENTS.heartPickup);
                heart.destroy();
            })
        }

        if (springGroup) {
            this.physics.add.overlap(player, springGroup, (_, spring) => {
                this.player.setVelocityY(-SPRING_VELOCITY);
                this.sound.play('springJump', { volume: 0.5 });
                // @ts-ignore .play does exist
                spring.play('spring_jump', true);
            })
        }

        this.physics.add.overlap(player, flag, () => {
            this.registry.events.emit(EVENTS.nextLevel);
        });

        if (enemyBounds && enemyGroup) {
            this.physics.add.collider(enemyGroup, platforms);
            this.physics.add.collider(enemyGroup, enemyBounds);
            this.physics.add.collider(player, enemyGroup, (_, enemy) => 
                enemyCollision(this, player, enemy));
        }

        // Camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(3);
        
        // cursors and keys
        const cursors = this.input.keyboard.createCursorKeys();
        const keys = this.input.keyboard.addKeys({
            shift: 'SHIFT',
            d: 'D',
            c: 'C',
        }) as KEYS;

        this.map = map;
        this.background = background;
        this.platforms = platforms;
        this.decorations = decorations;
        this.spikes = spikes;
        this.player = player;
        this.cursors = cursors;
        this.keys = keys;
        this.enemies = enemyGroup;
        this.spawnCoord = {
            x: player.x,
            y: player.y,
        };
    }

    update(): void {
        // Player movement
        if (fly) {
            debugMovement(this.player, this.cursors);
        } else {
            playerUpdate(this.player, this.cursors);
        }

        // Debug tools
        if (this.keys.shift?.isDown && this.keys.d?.isDown && !debounced) {
            debounced = true;
            setTimeout(() => {
                debounced = false;
            }, 1000);
            fly = !fly;
        }

        // Enemies
        this.enemies.children.each((enemy) => {
            enemyUpdate(enemy);
        });
    }
};

export default Level;
