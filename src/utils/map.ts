import Phaser from 'phaser';
import { createPlayer } from './player';
import { bobbingTween } from './tweens';

export const createLevelMap = (ctx: Phaser.Scene, mapName: string):{
    map: Phaser.Tilemaps.Tilemap,
    tilesets: Phaser.Tilemaps.Tileset[],
    background: Phaser.Tilemaps.StaticTilemapLayer,
    enemyBounds: Phaser.Tilemaps.StaticTilemapLayer,
    platforms: Phaser.Tilemaps.StaticTilemapLayer,
    decorations: Phaser.Tilemaps.StaticTilemapLayer,
    spikes: Phaser.Tilemaps.StaticTilemapLayer,
    spikeGroup: Phaser.Physics.Arcade.StaticGroup,
    coinGroup: Phaser.Physics.Arcade.Group,
    diamondGroup: Phaser.Physics.Arcade.Group,
    heartGroup: Phaser.Physics.Arcade.Group,
    enemyGroup: Phaser.Physics.Arcade.Group,
    springGroup: Phaser.Physics.Arcade.Group,
    player: Phaser.Physics.Arcade.Sprite,
    flag: Phaser.Physics.Arcade.Sprite,
} => {
    const map = ctx.make.tilemap({
        key: mapName
    });

    const t1 = map.addTilesetImage('kenny_1bit_pack', 'tiles', 16, 16, 1, 2);
    const t2 = map.addTilesetImage('kenny_1bit_transparent', 'tilesTrans', 16, 16, 1, 2);
    const tilesets = [t1, t2];

    const background = map.createStaticLayer('Background', tilesets, 0, 0);
    const platforms = map.createStaticLayer('Platforms', tilesets, 0, 0);
    const decorations = map.createStaticLayer('Decorations', tilesets, 0, 0);
    const spikes = map.createStaticLayer('Spikes', tilesets, 0, 0);
    const coins = map.getObjectLayer('Coins')?.['objects'];
    const diamonds = map.getObjectLayer('Diamonds')?.['objects'];
    const springs = map.getObjectLayer('Springs')?.['objects'];
    const hearts = map.getObjectLayer('Hearts')?.['objects'];
    const enemyBounds = map.createStaticLayer('EnemyBounds', tilesets, 0, 0);
    const enemies = map.getObjectLayer('Enemies')?.['objects'];

    // Interactibles
    const spikeGroup = ctx.physics.add.staticGroup();
    spikes?.forEachTile((tile) => {
        if (tile.index === -1) return;
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const spike = spikeGroup.create(x, y);
        spike.visible = false;
        spike.body.setSize(10, 5).setOffset(11, 17);
    });

    const springGroup = ctx.physics.add.group({ allowGravity: false, immovable: true });
    springs?.forEach((s) =>
        springGroup.create(s.x, s.y, 'spring')
            .setOrigin(0, 1)
            .setSize(12, 5));

    // Collectibles
    const coinGroup = createCollectibleGroup(ctx, coins, 'coin');
    const diamondGroup = createCollectibleGroup(ctx, diamonds, 'diamond');
    const heartGroup = createCollectibleGroup(ctx, hearts, 'heart');

    // Enemies
    const enemyGroup = ctx.physics.add.group();
    enemies?.forEach((enemy) => {
        const enem = enemyGroup.create(enemy.x, enemy.y, 'enemy');
        enem.setOrigin(0, 1);
        enem.setSize(13, 13);
        enem.setOffset(1, 3);
    });

    // spawning player
    const spawnPoint = map.findObject('Spawn', obj => obj.name === 'Player Spawn');
    // @ts-ignore x and y does exist, ts is dumb here
    const player = createPlayer(ctx, spawnPoint.x, spawnPoint.y);

    // End flag
    const flagObj = map.findObject('Flag', obj => obj.name === 'EndFlag');
    // @ts-ignore x and y does exist, ts is dumb af here
    const flag = ctx.physics.add.sprite(flagObj.x, flagObj.y, 'flag')
        .setOrigin(0, 1).setImmovable(true);
    // @ts-ignore wtf is ts doing
    flag.body.setAllowGravity(false);

    // Front decorations
    map.createStaticLayer('FrontDecorations', tilesets, 0, 0);

    return {
        map,
        tilesets,
        background,
        enemyBounds,
        platforms,
        decorations,
        spikes,
        enemyGroup,
        spikeGroup,
        coinGroup,
        diamondGroup,
        heartGroup,
        springGroup,
        player,
        flag,
    };
};

const createCollectibleGroup = (
    ctx: Phaser.Scene,
    tileObjects: Phaser.Types.Tilemaps.TiledObject[],
    spriteKey: string,
): Phaser.Physics.Arcade.Group  => {
    const group = ctx.physics.add.group({ allowGravity: false });
    tileObjects?.forEach((c) => {
        const sprite = group.create(c.x, c.y, spriteKey)
            .setOrigin(0, 1)
            .setSize(12, 12);
        bobbingTween(ctx, sprite);
    });
    return group;
};
