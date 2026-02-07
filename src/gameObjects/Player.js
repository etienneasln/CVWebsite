export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, direction = 'down') {
    super(scene, x, y, 'character')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
    this.initAnimations()

    this.setOrigin(0.5, 1)

    this.direction = direction
  }

  faceDirection (direction, frameindex) {
    this.anims.create({
      key: direction,
      frames: [{ key: 'character', frame: frameindex }],
      frameRate: 1
    })
  }

  moveDirection (direction, frameStart, frameEnd) {
    this.anims.create({
      key: direction,
      frames: this.anims.generateFrameNumbers('character', {
        start: frameStart,
        end: frameEnd
      }),
      frameRate: 10,
      repeat: -1
    })
  }

  initAnimations () {
    this.moveDirection('down', 0, 2)
    this.moveDirection('left', 3, 5)
    this.moveDirection('right', 6, 8)
    this.moveDirection('up', 9, 11)
    this.faceDirection('faceDown', 1)
    this.faceDirection('faceLeft', 4)
    this.faceDirection('faceRight', 7)
    this.faceDirection('faceUp', 10)
  }

  moveLeft () {
    this.setVelocity(-200, 0)
    this.anims.play('left', true)
    this.direction = 'left'
  }

  moveRight () {
    this.setVelocity(200, 0)
    this.anims.play('right', true)
    this.direction = 'right'
  }

  idle () {
    this.setVelocity(0)
    switch (this.direction) {
      case 'down':
        this.anims.play('faceDown', true)
        break
      case 'left':
        this.anims.play('faceLeft', true)
        break
      case 'right':
        this.anims.play('faceRight', true)
        break
      case 'up':
        this.anims.play('faceUp', true)
        break
    }
  }

  moveUp () {
    this.setVelocity(0, -200)
    this.anims.play('up', true)
    this.direction = 'up'
  }

  moveDown () {
    this.setVelocity(0, 200)
    this.anims.play('down', true)
    this.direction = 'down'
  }
}
