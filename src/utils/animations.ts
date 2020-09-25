import Phaser from 'phaser';

const createPlayerAnimations = (ctx: Phaser.Scene) => {
    ctx.anims.create({
        key: 'player_walk',
        frames: ctx.anims.generateFrameNames('player', {
            prefix: 'player',
            start: 2,
            end: 3,
        }),
        frameRate: 8,
        repeat: -1,
    });

    ctx.anims.create({
        key: 'player_idle',
        frames: ctx.anims.generateFrameNames('player', {
            prefix: 'player',
            start: 1,
            end: 1,
        }),
        frameRate: 8,
        repeat: -1,
    });

    ctx.anims.create({
        key: 'player_jump',
        frames: ctx.anims.generateFrameNames('player', {
            prefix: 'player',
            start: 4,
            end: 5,
        }),
        frameRate: 8,
        repeat: 0,
    });
};

const createSpringAnimations = (ctx: Phaser.Scene) => {
    ctx.anims.create({
        key: 'spring_jump',
        frames: ctx.anims.generateFrameNames('springAtlas', {
            prefix: 'spring',
            start: 1,
            end: 3,
        }),
        frameRate: 25,
        repeat: 0,
    });
    
    ctx.anims.get('spring_jump')
        .addFrame(ctx.anims.generateFrameNames('springAtlas', {
            prefix: 'spring',
            start: 3,
            end: 1,
        }));
};

const createEnemyAnimations = (ctx: Phaser.Scene) => {
    ctx.anims.create({
        key: 'enemy_walk',
        frames: ctx.anims.generateFrameNames('enemy', {
            prefix: 'enemy',
            start: 2,
            end: 3,
        }),
        frameRate: 8,
        repeat: -1,
    });

    ctx.anims.create({
        key: 'enemy_idle',
        frames: ctx.anims.generateFrameNames('enemy', {
            prefix: 'enemy',
            start: 1,
            end: 1,
        }),
        frameRate: 8,
        repeat: -1,
    });

    ctx.anims.create({
        key: 'enemy_jump',
        frames: ctx.anims.generateFrameNames('enemy', {
            prefix: 'enemy',
            start: 4,
            end: 5,
        }),
        frameRate: 8,
        repeat: 0,
    });
};

export const createAnimations = (ctx: Phaser.Scene) => {
    createPlayerAnimations(ctx);
    createSpringAnimations(ctx);
    createEnemyAnimations(ctx);
}
