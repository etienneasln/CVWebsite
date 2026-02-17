import Player from '../gameObjects/Player.js'

export default class InteriorTiledScene extends Phaser.Scene {
  constructor (sceneName, scenePath, tileWidth, tileHeight) {
    super(sceneName)
    this.sceneName = sceneName
    this.scenePath = scenePath
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
  }

  init (data) {
    this.spawnX = data.spawnX
    this.spawnY = data.spawnY
    this.initialPlayerDirection = data.direction
  }

  preload () {
    this.load.setPath('assets')
    this.load.tilemapTiledJSON(this.sceneName, this.scenePath)
  }

  create (tiledLayers, centralize = false, furnitureObjects = false) {
    this.map = this.make.tilemap({
      key: this.sceneName,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight
    })

    this.depthGroup = this.add.group()

    this.player = new Player(
      this,
      this.spawnX,
      this.spawnY,
      this.initialPlayerDirection
    )

    this.cursors = this.input.keyboard.createCursorKeys()

    if (centralize) {
      this.cameras.main.setScroll(
        (this.map.widthInPixels - this.scale.width) / 2,
        (this.map.heightInPixels - this.scale.height) / 2
      )
    } else {
      this.cameras.main.setBounds(
        0,
        0,
        this.map.widthInPixels,
        this.map.heightInPixels
      )
      this.cameras.main.startFollow(this.player)
    }

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    )

    this.cameras.main.roundPixels = true

    const tilesets = [
      this.map.addTilesetImage('Room_Builder', 'room'),
      this.map.addTilesetImage('Furniture', 'furniture')
    ]

    this.tiledLayers = tiledLayers.map(tl => this.map.createLayer(tl, tilesets))

    if (furnitureObjects) {
      const furnitureObjects = this.map.getObjectLayer('Furniture').objects

      this.depthGroup.add(this.player)

      furnitureObjects.forEach(obj => {
        if (!obj.gid) return

        let gid = obj.gid

        const tileset = tilesets[1]

        if (!tileset) return

        const localId = gid - tileset.firstgid

        const sprite = this.add.sprite(obj.x, obj.y, tileset.image.key, localId)

        sprite.setOrigin(0, 1)

        sprite.setAngle(obj.rotation || 0)

        sprite.setFlip(obj.flippedHorizontal, obj.flippedVertical)

        this.depthGroup.add(sprite)
      })
    }

    const collisions = this.map.getObjectLayer('Collisions').objects

    collisions.forEach(obj => {
      const rect = this.add.rectangle(
        obj.x + obj.width / 2,
        obj.y + obj.height / 2,
        obj.width,
        obj.height
      )

      this.physics.add.existing(rect, true)
      this.physics.add.collider(this.player, rect)
    })

    const doors = this.map.getObjectLayer('Doors')?.objects

    doors.forEach(door => {
      const zone = this.add.zone(
        door.x + door.width / 2,
        door.y + door.height / 2,
        door.width,
        door.height
      )

      this.physics.world.enable(zone)
      zone.body.setAllowGravity(false)
      zone.body.setImmovable(true)

      zone.targetScene = door.properties.find(
        p => p.name === 'targetScene'
      )?.value

      this.physics.add.overlap(this.player, zone, () => {
        this.scene.start(
          zone.targetScene,
          this.targetSceneData(zone.targetScene)
        )
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
