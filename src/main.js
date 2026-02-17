import Preloader from './scenes/Preloader.js'
import Game from './scenes/Game.js'
import Schoolhallway from './scenes/schoolScenes/Schoolhallway.js'
import USClassroom from './scenes/schoolScenes/USClassroom.js'

const config = {
  type: Phaser.AUTO,
  title: 'CVWebsite',
  description: '',
  parent: 'game-container',
  width: 600,
  height: 400,
  backgroundColor: '#000000',
  pixelArt: false,
  scene: [Preloader, Game, Schoolhallway, USClassroom],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
}

new Phaser.Game(config)
