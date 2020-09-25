import Phaser from 'phaser';

interface Choice {
    text: string,
    callback: (ctx: Phaser.Scene, text: Phaser.GameObjects.Text) => void,
    color?: string, //  maybe a phaser color
    font?: string, // maybe the type is not string
}

interface MenuArgs {
    x: number,
    y: number,
    choices: Choice[],

    arrowText?: string,
    padding?: number,
    arrowPadding?: number,
    fontSize?: number,
}

export const setMenuCtx = (ctx: Phaser.Scene) => ({
    x, 
    y,
    choices,

    arrowText = '->',
    padding = 30,
    arrowPadding = 30,
    fontSize = 20,
}: MenuArgs): void => {
    let index = 0;
    const container = ctx.add.container(x, y);

    //  font and colors
    const choiceTexts = choices.map(({ text }, i) =>
        ctx.add.text(x + 30, (y + (padding * i)), text, {
            fontSize,
        }));

    const arrow = ctx.add.text(x, y, arrowText, {
        fontSize
    });

    const moveArrow = () => {
        const { x, y } = choiceTexts[index];
        arrow.setPosition(x - arrowPadding, y);
    };

    container.add(choiceTexts);
    container.add(arrow);

    const down = ctx.input.keyboard.addKey('DOWN');
    const up = ctx.input.keyboard.addKey('UP');
    const enter = ctx.input.keyboard.addKey('ENTER');

    up.on('down', () => {
        // go up in the list
        if (index !== 0) {
            index--;
            ctx.sound.play('cursorMove');
        }
        moveArrow();
    });
    down.on('down', () => {
        // go down in the list
        if (index < (choices.length - 1)) {
            index++;
            ctx.sound.play('cursorMove');
        }
       moveArrow();
    });
    enter.on('down', () => choices[index].callback(ctx, choiceTexts[index]));

    ctx.events.on('shutdown', () => {
        up.destroy();
        down.destroy();
        enter.destroy();
        arrow.destroy();
        choiceTexts.map(text => text.destroy());
        container.destroy();
    });
};
