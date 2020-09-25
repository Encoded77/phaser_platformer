import { EVENTS } from './constants';
import { flashRed } from './tweens';

const ENEMY_SPEED = 50;

export const enemyUpdate = (
    enemyObj: Phaser.GameObjects.GameObject
) => {
    // Phaser is wrongly typed when iterating over a group of physics enabled objects
    const enemy = enemyObj as Phaser.Physics.Arcade.Sprite & { direction: string };

    // fixing when enemy is stuck
    if (enemy.direction === 'right') enemy.setVelocityX(ENEMY_SPEED);
    if (enemy.direction === 'left') enemy.setVelocityX(-ENEMY_SPEED);

    if (enemy.body.blocked.right && enemy.direction === 'right' || !enemy.direction) {
        enemy.direction = 'left';
        enemy.flipX = true;
        enemy.anims.play('enemy_walk', true);
        enemy.setVelocityX(-ENEMY_SPEED);
    } else if (enemy.body.blocked.left && enemy.direction === 'left') {
        enemy.direction = 'right';
        enemy.flipX = false;
        enemy.anims.play('enemy_walk', true);
        enemy.setVelocityX(ENEMY_SPEED);
    }
};

export const enemyCollision = (
    ctx: Phaser.Scene & { spawnCoord: { x: number, y: number } },
    player: Phaser.Physics.Arcade.Sprite,
    enemyObj: Phaser.GameObjects.GameObject,
) => {
    // Phaser is wrongly typed when iterating over a group of physics enabled objects
    const enemy = enemyObj as Phaser.Physics.Arcade.Sprite;

    if (player.body.touching.down && enemy.body.touching.up) {
        // player jumped on enemy
        const deadEnemy = ctx.add.sprite(enemy.x, enemy.y, 'deadEnemy');
        deadEnemy.setOrigin(0, 1);
        deadEnemy.setSize(13, 13);
        enemy.destroy();
        player.anims.play('player_jump');
        player.setVelocityY(-200);
        ctx.sound.play('enemyDeath', { volume: 0.5 });
    } 
    else if (enemy.body.touching.left || enemy.body.touching.right) {
        // player died
        ctx.registry.events.emit(EVENTS.death);
        flashRed(ctx, player);
        ctx.sound.play('playerDeath');
        player.setX(ctx.spawnCoord.x);
        player.setY(ctx.spawnCoord.y);
    }
};
