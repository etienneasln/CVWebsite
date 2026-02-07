import { Player } from '../gameObjects/Player.js'
import { Building } from '../gameObjects/Building.js'

export class Game extends Phaser.Scene {
  constructor () {
    super('Game')
  }

  preload () {
    this.load.setPath('assets/Game')
    this.load.image('background', 'tileset.png')
    this.load.image('university', 'university.png')
    this.load.image('school', 'primary school.png')
    this.load.image('slide', 'slide.png')
    this.load.image('building', 'office building.png')
    this.load.image('signpost', 'signpost.png')
  }

  init (data) {
    this.spawnX = data.spawnX ?? 864
    this.spawnY = data.spawnY ?? 540
    this.initialPlayerDirection = data.direction ?? 'down'
  }

  create () {
    this.background = this.add.image(864, 540, 'background')
    this.depthGroup = this.add.group()

    this.player = new Player(
      this,
      this.spawnX,
      this.spawnY,
      this.initialPlayerDirection
    )

    this.depthGroup.add(this.player)

    this.cameras.main.setBounds(
      0,
      0,
      this.background.width,
      this.background.height
    )
    this.physics.world.setBounds(
      0,
      0,
      this.background.width,
      this.background.height
    )

    this.cursors = this.input.keyboard.createCursorKeys()

    this.cameras.main.startFollow(this.player)

    this.buildings = this.physics.add.staticGroup()

    this.buildingslist = [
      new Building(this, 710, 450, 'university', 0.4),
      new Building(this, 710, 700, 'school', 0.25),
      new Building(this, 630, 690, 'slide', 0.2, 30),
      new Building(this, 1023, 450, 'building', 0.4),
      new Building(this, 790, 475, 'signpost', 1.1, 30)
    ]

    this.buildingslist.forEach(el => {
      this.buildings.add(el)
      this.depthGroup.add(el)
    })

    this.physics.add.collider(this.player, this.buildings)

    const schoolzone = this.add.zone(709, 670, 10, 10)

    this.physics.world.enable(schoolzone)
    schoolzone.body.setAllowGravity(false)
    schoolzone.body.setImmovable(true)

    this.physics.add.overlap(this.player, schoolzone, () => {
      this.scene.start('Schoolhallway', {
        spawnX: 480,
        spawnY: 628,
        direction: 'up'
      })
    })
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
}
