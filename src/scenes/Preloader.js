export class Preloader extends Phaser.Scene {

    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('background', 'tileset.png');
        this.load.image('university', 'university.png');
        this.load.image('school', 'primary school.png');
        this.load.image('slide', 'slide.png');
        this.load.image('building', 'office building.png');
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
