export class Building extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, image, scale=1, offset=40)
    {
        super(scene, x, y, image);

        scene.add.existing(this);
        scene.physics.add.existing(this,true);

        this.body.offset.setTo(0,offset);
        this.body.setSize(this.width*scale*0.9,this.height * 0.25*scale);

        this.setOrigin(0.5,1);
        this.setScale(scale);     

        scene.buildings.add(this);
        scene.depthGroup.add(this);

    }
}