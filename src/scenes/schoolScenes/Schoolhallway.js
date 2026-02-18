import InteriorTiledScene from '../InteriorTiledScene.js'

export default class Schoolhallway extends InteriorTiledScene {
  constructor () {
    super('Schoolhallway', 'School/schoolhallway.json', 30, 20)
  }

  create () {
    super.create(['Floors', 'Walls', 'Furniture', 'Front Walls'])

    this.player.setDepth(3)

    this.tiledLayers[0].setDepth(0)
    this.tiledLayers[1].setDepth(1)
    this.tiledLayers[2].setDepth(2)
    this.tiledLayers[3].setDepth(4)
  }

  targetSceneData (targetScene) {
    switch (targetScene) {
      case 'MainScene':
        this.spawnX = 709
        this.spawnY = 710
        this.direction = 'down'
        break
      case 'USClassroom':
        this.spawnX = 48
        this.spawnY = 249
        this.direction = 'up'
        break
    }

    return {
      spawnX: this.spawnX,
      spawnY: this.spawnY,
      direction: this.direction
    }
  }
}
