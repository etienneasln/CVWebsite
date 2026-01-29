export class Preloader extends Phaser.Scene {

    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('background', 'tileset.png');
        this.load.spritesheet(
            'character',
            'character.png',
            {frameWidth: 32, frameHeight: 32}
        );
    }

    create() {
        this.scene.start('Game');
    }

}
