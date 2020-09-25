import Boot from '../scenes/Boot';
import AssetsLoad from '../scenes/AssetsLoad';
import Organizer from '../scenes/Organizer';
import Level from '../scenes/Level';
import MainMenu from '../scenes/UI/MainMenu';
import Score from '../scenes/UI/Score';
import Win from '../scenes/UI/Win';
import GameOver from '../scenes/UI/GameOver';
import Pause from '../scenes/UI/Pause';

export const SCENES = Object.freeze({
    boot: {
        name: 'Boot',
        classRef: Boot,
    },
    assetsLoad: {
        name: 'AssetsLoad',
        classRef: AssetsLoad,
    },
    mainMenu: {
        name: 'MainMenu',
        classRef: MainMenu,
    },
    organizer: {
        name: 'Organizer',
        classRef: Organizer,
    },
    level: {
        name: 'Level',
        classRef: Level,
    },
    score: {
        name: 'Score',
        classRef: Score,
    },
    win: {
        name: 'Win',
        classRef: Win,
    },
    gameOver: {
        name: 'GameOver',
        classRef: GameOver,
    },
    pause: {
        name: 'Pause',
        classRef: Pause,
    }
});

export const EVENTS = Object.freeze({
    coinPickup: 'add-coin',
    diamondPickup: 'add-diamond', 
    heartPickup: 'add-heart',
    nextLevel: 'next-level',
    death: 'death',
    gameOver: 'game-over',
});

export const SETTINGS = Object.freeze({
    DEFAULT_WIDTH: 1280,
    DEFAULT_HEIGHT: 720,
});
