export const showCollisions = (ctx: Phaser.Scene, group) => {
    const debugGraphics = ctx.add.graphics().setAlpha(0.75);
    group.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
};

export const debugMovement = (
    actor: Phaser.Physics.Arcade.Sprite,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
) => {
    actor.setVelocityY(0);
    actor.setVelocityX(0);

    if (cursors.left?.isDown) {
        actor.setVelocityX(-200);
    } 
    if (cursors.right?.isDown) {
        actor.setVelocityX(200);
    }
    if (cursors.up?.isDown) {
        actor.setVelocityY(-200);
    }
    if (cursors.down?.isDown) {
        actor.setVelocityY(200);
    }
};
