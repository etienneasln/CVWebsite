import Building from '../gameObjects/Building.js'
import CVWebsitePlayerScene from './CVWebsitePlayerScene.js'

export default class MainScene extends CVWebsitePlayerScene {
  constructor () {
    super('MainScene')
  }

  preload () {
    this.load.setPath('assets/MainScene')
    this.load.image('background', 'tileset.png')
    this.load.image('university', 'university.png')
    this.load.image('school', 'primary school.png')
    this.load.image('slide', 'slide.png')
    this.load.image('building', 'office building.png')
    this.load.image('signpost', 'signpost.png')
  }

  create () {
    this.background = this.add.image(864, 540, 'background')

    super.create()

    this.depthGroup.add(this.player)

    this.cameras.main.setBounds(
      0,
      0,
      this.background.width,
      this.background.height
    )

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

  sceneWidth () {
    return this.background.width
  }

  sceneHeight () {
    return this.background.height
  }
}
