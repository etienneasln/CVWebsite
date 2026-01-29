import { Player } from '../gameObjects/Player.js'

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.background = this.add.image(864, 540, 'background');
        this.player = new Player(this, 864, 540);

        this.cameras.main.setBounds(0, 0, 1728, 1080);
        this.physics.world.setBounds(0, 0, 1728, 1080);
        

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);

    }

    update() {

        if (this.cursors.left.isDown){
            this.player.moveLeft();
        }
        else if (this.cursors.right.isDown){
            this.player.moveRight();
        }
        else if (this.cursors.up.isDown){
            this.player.moveUp();
        }
        else if (this.cursors.down.isDown)
        {
            this.player.moveDown();
        }
        else{
            this.player.idle();
        }
    }


}
