import Phaser from 'phaser';

const PLAYER_SPEED = 85;
const PLAYER_JUMP_HEIGHT = 200;

export const createPlayer = (ctx: Phaser.Scene, x: number, y: number): Phaser.Physics.Arcade.Sprite => {
    const player = ctx.physics.add.sprite(x, y, 'player');
    player.setBounce(0.01);
    player.setCollideWorldBounds(true);
    player.setSize(13, 13);
    player.setOffset(1, 3);
    return player;
};

let jumping = false;
let jumpTimer = 0;
export const playerUpdate = (
    player: Phaser.Physics.Arcade.Sprite,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
) => {
    player.setDragX(350);
    if (cursors.right?.isDown) player.flipX = false;
    if (cursors.left?.isDown) player.flipX = true;

    if (cursors.left?.isDown) {
        player.setVelocityX(-PLAYER_SPEED);
        if (player.body.blocked.down) {
            player.play('player_walk', true);
        }
    } else if (cursors.right?.isDown) {
        player.setVelocityX(PLAYER_SPEED);
        if (player.body.blocked.down) {
            player.play('player_walk', true);
        }
    }

    if (cursors.space?.isDown) {
        if (player.body.blocked.down && jumpTimer === 0) {
            jumping = true;
            jumpTimer = 1;
            player.setVelocityY(-PLAYER_JUMP_HEIGHT);
            player.play('player_jump', true);
        } 
        else if (jumpTimer > 0 && jumpTimer < 15 && jumping) {
            jumpTimer++;
            player.play('player_jump', true);
            player.setVelocityY(-PLAYER_JUMP_HEIGHT - (jumpTimer/2));
        }

    } else if (player.body.blocked.down || jumping) {;
        jumpTimer = 0;
        if (player.body.blocked.down) jumping = false;
    }
    
    if (!cursors.down?.isDown &&
        !cursors.up?.isDown &&
        !cursors.left?.isDown &&
        !cursors.right?.isDown &&
        !jumping &&
        jumpTimer === 0
    ) {
        player.play('player_idle', true);
    }
};
