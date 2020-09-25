
export const flashRed = (scene: Phaser.Scene, actor, duration = 120, repeat = 1) => {
    const c1 = Phaser.Display.Color.HexStringToColor('#ffffff'); // From no tint
    const c2 = Phaser.Display.Color.HexStringToColor('#ff0000'); // To RED

    actor.tweenStep = 0;
    scene.tweens.add({
        targets: actor,
        tweenStep: 100,
        onUpdate: () => {
            let col = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100, actor.tweenStep);
            let colourInt = Phaser.Display.Color.GetColor(col.r, col.g, col.b);
            actor.setTint(colourInt);
        },
        onComplete: () => {
            actor.setTint(0xFFFFFF); // reset tint to default
        },
        repeat,
        duration,
        yoyo: true // Return to first tint
    });
};

export const flashTransparent = (scene: Phaser.Scene, actor, duration = 120, repeat = 2) => {
    actor.tweenStep = 0;
    scene.tweens.add({
        targets: actor,
        tweenStep: 100,
        alpha: { start: 0, to: 1, duration: 200, ease: 'linear' },
        repeat,
        duration,
    });
};

export const bobbingTween = (ctx: Phaser.Scene, actor) =>
    ctx.tweens.add({
        targets: actor,
        y: actor.y + 5,
        duration: 2000,
        ease: 'linear',
        yoyo: true,
        repeat: -1,
    });
