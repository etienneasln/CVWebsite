import InteriorTiledScene from '../InteriorTiledScene.js'

export default class USClassroom extends InteriorTiledScene {
  constructor () {
    super('USClassroom', 'School/usclassroom.json', 13, 8)
  }

  create () {
    super.create(
      [
        'Floors',
        'Walls',
        'Furniture behind',
        'Furniture in front',
        'Front Walls'
      ],
      true,
      true
    )

    this.tiledLayers[0].setDepth(-3)
    this.tiledLayers[1].setDepth(-2)
    this.tiledLayers[1].setDepth(-1)

    this.tiledLayers[3].setDepth(Number.MAX_SAFE_INTEGER - 1)
    this.tiledLayers[4].setDepth(Number.MAX_SAFE_INTEGER)
  }

  targetSceneData (_) {
    return {
      spawnX: 48,
      spawnY: 268,
      direction: 'down'
    }
  }
}
