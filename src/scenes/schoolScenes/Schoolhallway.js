import { Player } from '../../gameObjects/Player.js'

export class Schoolhallway extends Phaser.Scene {
    constructor() {
        super('Schoolhallway');
    }

    init(data){
        this.spawnX = data.spawnX;
        this.spawnY = data.spawnY;
        this.initialPlayerDirection = data.direction;
    }

    preload (){
        this.load.setPath('assets');
        this.load.tilemapTiledJSON('schoolhallway','School/schoolhallway.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'schoolhallway', tileWidth:30, tileHeight:20 });
        this.depthGroup = this.add.group();

        this.player = new Player(this, this.spawnX, this.spawnY, this.initialPlayerDirection);

        this.player.setDepth(3);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;






        const tilesets = [map.addTilesetImage(
            'Room_Builder',
            'room'      
        ), map.addTilesetImage(
            'Furniture',
            'furniture'
        )];


        const floorLayer = map.createLayer(
            'Floors',
            tilesets
        );

        floorLayer.setDepth(0);

        const wallLayer = map.createLayer(
            'Walls',
            tilesets
        );


        wallLayer.setDepth(1);




        const furnitureLayer = map.createLayer(
            'Furniture',
            tilesets
        );

        furnitureLayer.setDepth(2);


        const frontWallsLayer = map.createLayer(
            'Front Walls',
            tilesets
        );

        frontWallsLayer.setDepth(4);




        
        const collisions = map.getObjectLayer('Collisions').objects;

        collisions.forEach(obj => {
            const rect = this.add.rectangle(
                obj.x + obj.width / 2,
                obj.y + obj.height / 2,
                obj.width,
                obj.height
            );

            this.physics.add.existing(rect, true);
            this.physics.add.collider(this.player, rect);
        });

        const doors = map.getObjectLayer('Doors')?.objects;

        doors.forEach(door => {
            const zone = this.add.zone(
                door.x + door.width / 2,
                door.y + door.height / 2,
                door.width,
                door.height
            );

            this.physics.world.enable(zone);
            zone.body.setAllowGravity(false);
            zone.body.setImmovable(true);

            zone.targetScene =
                door.properties.find(p => p.name === 'targetScene')?.value;

            this.physics.add.overlap(this.player, zone, () => {
                this.scene.start(zone.targetScene,
                this.targetSceneData(zone.targetScene));
            });
        });


    }

    update() {

        if (this.cursors.up.isDown){
            this.player.moveUp();
        }
        else if (this.cursors.down.isDown){
            this.player.moveDown();
        }
        else if (this.cursors.left.isDown){
            this.player.moveLeft();
        }
        else if (this.cursors.right.isDown)
        {
            this.player.moveRight();
        }
        else{
            this.player.idle();
        }
    
    }

    targetSceneData(targetScene){
        switch (targetScene){
            case 'Game':
                this.spawnX=709;
                this.spawnY=710;
                this.direction='down';
                break;
        }

        return {spawnX:this.spawnX,spawnY:this.spawnY,direction:this.direction}
    }




}