import Phaser from 'phaser';
import generalConfig from './scripts/config/generalConfig';
import Boot from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';
import WinScene from './scripts/scenes/WinScene';
import GameOverScene from './scripts/scenes/GameOverScene';

const phaserConfig = {
    type: Phaser.AUTO,
    width: generalConfig.baseWidth,
    height: generalConfig.baseHeight,
    scene: [Boot,PreloadScene,GameScene,WinScene,GameOverScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
        }
    },


};

const game = new Phaser.Game(phaserConfig);
