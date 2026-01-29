export class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'character');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.initAnimations();
    }

    initAnimations ()
    {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'character', frame: 1 } ],
            frameRate: 1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('character', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    moveLeft ()
    {
        this.setVelocity(-200,0);
        this.anims.play('left', true);
    }

    moveRight ()
    {
        this.setVelocity(200,0);
        this.anims.play('right', true);
    }

    idle ()
    {
        this.setVelocity(0);
        this.anims.play('turn');
    }

    moveUp ()
    {
        this.setVelocity(0,-200);
        this.anims.play('up', true);
    }

    moveDown ()
    {
        this.setVelocity(0,200);
        this.anims.play('down', true);
    }

}