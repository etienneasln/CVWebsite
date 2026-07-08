import Preloader from './scenes/Preloader.js'
import MainScene from './scenes/MainScene.js'
import Schoolhallway from './scenes/schoolScenes/Schoolhallway.js'
import USClassroom from './scenes/schoolScenes/USClassroom.js'
import FrancePrimaryClassroom from './scenes/schoolScenes/FrancePrimaryClassroom.js'


const config = {
  type: Phaser.AUTO,
  title: 'CVWebsite',
  description: '',
  parent: 'game-container',
  width: 600,
  height: 400,
  backgroundColor: '#000000',
  pixelArt: false,
  scene: [Preloader, MainScene, Schoolhallway, USClassroom, FrancePrimaryClassroom],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

new Phaser.Game(config)
