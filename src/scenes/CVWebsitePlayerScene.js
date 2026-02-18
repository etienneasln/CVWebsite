import Player from '../gameObjects/Player.js'

export default class CVWebsitePlayerScene extends Phaser.Scene {
  constructor (sceneName) {
    super(sceneName)
    this.sceneName = sceneName
  }

  init (data) {
    this.spawnX = data.spawnX
    this.spawnY = data.spawnY
    this.initialPlayerDirection = data.direction
  }

  create () {
    this.depthGroup = this.add.group()

    this.player = new Player(
      this,
      this.spawnX,
      this.spawnY,
      this.initialPlayerDirection
    )

    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.world.setBounds(0, 0, this.sceneWidth(), this.sceneHeight())
  }

  update () {
    if (this.cursors.up.isDown) {
      this.player.moveUp()
    } else if (this.cursors.down.isDown) {
      this.player.moveDown()
    } else if (this.cursors.left.isDown) {
      this.player.moveLeft()
    } else if (this.cursors.right.isDown) {
      this.player.moveRight()
    } else {
      this.player.idle()
    }

    this.depthGroup.children.iterate(child => {
      if (child.y !== undefined) {
        child.setDepth(child.y)
      }
    })
  }

  sceneWidth () {
    return 0
  }

  sceneHeight () {
    return 0
  }
}
