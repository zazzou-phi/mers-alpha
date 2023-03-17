import Phaser from "phaser";

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    var theta = scene.player.rotation;
    var x = scene.player.x + 78 * Math.cos(theta);
    var y = scene.player.y + 78 * Math.sin(theta);

    super(scene, x, y, "bullet");
    this.setAngle(Phaser.Math.RAD_TO_DEG * theta);

    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    this.body.velocity.x = 800 * Math.cos(theta);
    this.body.velocity.y = 800 * Math.sin(theta);

    scene.projectiles.add(this);
  }
}
