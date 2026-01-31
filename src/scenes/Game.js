import { Player } from '../gameObjects/Player.js'
import { Building } from '../gameObjects/Building.js'


export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.background = this.add.image(864, 540, 'background');
        this.depthGroup = this.add.group();
        
        new Player(this, 864, 540);

        
        this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);
        this.physics.world.setBounds(0, 0, this.background.width, this.background.width);
        
        

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);

        this.buildings = this.physics.add.staticGroup();

        new Building(this, 710, 450, 'university', 0.4);
        new Building(this, 710, 700, 'school', 0.25);
        new Building(this, 630, 690, 'slide', 0.2,30);
        new Building(this, 1000, 450, 'building', 0.4);

        this.physics.add.collider(this.player, this.buildings);

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
        

        this.depthGroup.children.iterate(child => {
            if (child.y !== undefined) {
                child.setDepth(child.y);
            }
        });
    }


}
