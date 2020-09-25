import { Scene } from 'phaser';
import { setMenuCtx } from '../utils/menu';

abstract class SceneBase extends Scene {
    // Add utils shared by scenes here
    createMenu = setMenuCtx(this);
}

export default SceneBase;
