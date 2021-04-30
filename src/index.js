import Phaser from 'phaser';
import Boot from './scripts/scenes/BootScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import GameScene from './scripts/scenes/GameScene';
import WinScene from './scripts/scenes/WinScene';
import GameOverScene from './scripts/scenes/GameOverScene';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 720,
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
    }
};

const game = new Phaser.Game(config);
