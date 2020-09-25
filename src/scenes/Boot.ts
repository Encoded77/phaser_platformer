import SceneBase from './SceneBase';
import { SCENES } from '../utils/constants';

class Boot extends SceneBase {
    create(): void {
        console.log('[Boot] init');
        this.scene.start(SCENES.assetsLoad.name);
    }
}

export default Boot;
