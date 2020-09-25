import SceneBase from './SceneBase';
import { SCENES } from '../utils/constants';
import { loadAssets } from '../utils/assets';
import { createAnimations } from '../utils/animations';

class AssetsLoad extends SceneBase {
    preload(): void {
        console.log('[AssetsLoad] load init');

        const xCenter = this.cameras.main.width / 2;
        const yCenter = this.cameras.main.height / 2;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        const loadingText = this.make.text({
            x: xCenter - 55,
            y: yCenter - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        const percentText = this.make.text({
            x: xCenter,
            y: yCenter + 25,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        progressBox.fillStyle(0x674759, 0.8);
        progressBox.fillRect(xCenter - 160, yCenter, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(xCenter - 150, yCenter + 10, 300 * value, 30);
            percentText.setText(`${(value * 100).toFixed(0)}%`);
        });
         
        this.load.on('complete', () => {
            percentText.destroy();
            loadingText.destroy();
            progressBar.destroy();
            progressBox.destroy();
        });
        loadAssets(this);
    }
    create(): void {
        console.log('[AssetsLoad] load done');
        console.log('[AssetsLoad] anim init');
        createAnimations(this);
        console.log('[AssetsLoad] anim done');
        this.scene.start(SCENES.mainMenu.name);
    }
};

export default AssetsLoad;
