import Phaser from 'phaser';

export const assetsMap = Object.freeze({
    tiles: '/assets/img/colored_packed.png',
    tilesTrans: '/assets/img/colored_transparent_packed.png',
    coin: '/assets/img/coin.png',
    diamond: '/assets/img/diamond.png',
    spring: '/assets/img/spring.png',
    flag: '/assets/img/flag.png',
    heart: '/assets/img/heart.png',
    deadEnemy: '/assets/img/dead_enemy.png',
    mainMenu: 'assets/img/main_menu.png',
});

export const audioMap = Object.freeze({
    tutorialBg: '/assets/sfx/tutorial_bg.ogg',
    coinPickup: '/assets/sfx/coin_pickup.wav',
    gemPickup: '/assets/sfx/gem_pickup.wav',
    heartPickup: '/assets/sfx/heart_pickup.wav',
    springJump: '/assets/sfx/spring.wav',
    spikeDeath: '/assets/sfx/spike_death.wav',
    enemyDeath: '/assets/sfx/enemy_death.ogg',
    playerDeath: '/assets/sfx/player_hit_by_enemy.ogg',
    cursorMove: '/assets/sfx/move_cursor.wav',
});

export const jsonMap = Object.freeze({
    level1: 'assets/levels/1.json',
    level2: 'assets/levels/2.json',
    level3: 'assets/levels/3.json',
});

export const atlasMap = Object.freeze({
    player: {
        json: 'assets/atlas/ss_player.json',
        texture: 'assets/atlas/ss_player.png',
    },
    springAtlas: {
        json: 'assets/atlas/spring.json',
        texture: 'assets/atlas/spring.png',
    },
    enemy: {
        json: 'assets/atlas/enemy.json',
        texture: 'assets/atlas/enemy.png',
    },
});

export const loadAssets = (ctx: Phaser.Scene) => {
    // Loose images/tilesets
    Object.entries(assetsMap).map(([name, file]) =>
        ctx.load.image(name, file));

    // Tiled tilemaps
    Object.entries(jsonMap).map(([name, file]) =>
        ctx.load.tilemapTiledJSON(name, file));

    // Atlases
    Object.entries(atlasMap).map(([key, { texture, json }]) =>
        ctx.load.atlas(key, texture, json));

    // Audio
    Object.entries(audioMap).map(([key, file]) => ctx.load.audio(key, file));
};
