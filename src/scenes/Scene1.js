import Phaser from "phaser";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  preload() {
    this.load.multiatlas(
      "shotgunPlayer",
      "/assets/images/player/shotgun/anims.json",
      "/assets/images/player/shotgun"
    );
    this.load.image("background", "/assets/tilemaps/Ground_Tile_01_C.png");
  }

  create() {
    // create background
    this.background = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    // create player and animations
    this.player = this.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "shotgunPlayer",
      "idle/survivor-idle_shotgun_0.png"
    );

    const idleFrames = this.anims.generateFrameNames("shotgunPlayer", {
      start: 0,
      end: 19,
      prefix: "idle/survivor-idle_shotgun_",
      suffix: ".png",
    });
    this.anims.create({
      key: "idle",
      frames: idleFrames,
      frameRate: 15,
      repeat: -1,
    });

    const moveFrames = this.anims.generateFrameNames("shotgunPlayer", {
      start: 0,
      end: 19,
      prefix: "move/survivor-move_shotgun_",
      suffix: ".png",
    });
    this.anims.create({
      key: "move",
      frames: moveFrames,
      frameRate: 30,
      repeat: 0,
    });

    const shootFrames = this.anims.generateFrameNames("shotgunPlayer", {
      start: 0,
      end: 2,
      prefix: "shoot/survivor-shoot_shotgun_",
      suffix: ".png",
    });
    this.anims.create({
      key: "shoot",
      frames: shootFrames,
      frameRate: 5,
      repeat: 0,
    });

    const meleeFrames = this.anims.generateFrameNames("shotgunPlayer", {
      start: 0,
      end: 14,
      prefix: "meleeattack/survivor-meleeattack_shotgun_",
      suffix: ".png",
    });
    this.anims.create({
      key: "melee",
      frames: meleeFrames,
      frameRate: 25,
      repeat: 0,
    });

    const reloadFrames = this.anims.generateFrameNames("shotgunPlayer", {
      start: 0,
      end: 19,
      prefix: "reload/survivor-reload_shotgun_",
      suffix: ".png",
    });
    this.anims.create({
      key: "reload",
      frames: reloadFrames,
      frameRate: 20,
      repeat: 0,
    });

    this.player.anims.play("idle");

    // deal with input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,S,A,D,E");
    this.input.on("pointermove", this.rotatePlayer, this);
  }

  rotatePlayer(pointer) {
    const targetAngle =
      Phaser.Math.RAD_TO_DEG *
      Phaser.Math.Angle.Between(
        this.player.x,
        this.player.y,
        pointer.x,
        pointer.y
      );

    this.player.setAngle(targetAngle);
  }

  update() {
    var theta = this.player.rotation;

    // deal with movement first
    if (this.keys.W.isDown) {
      this.player.x += 4 * Math.cos(theta);
      this.player.y += 4 * Math.sin(theta);
    }

    if (this.keys.S.isDown) {
      this.player.x -= 3 * Math.cos(theta);
      this.player.y -= 3 * Math.sin(theta);
    }

    if (this.keys.A.isDown) {
      this.player.x += 2 * Math.sin(theta);
      this.player.y -= 2 * Math.cos(theta);
    }

    if (this.keys.D.isDown) {
      this.player.x -= 2 * Math.sin(theta);
      this.player.y += 2 * Math.cos(theta);
    }

    // now deal with animations
    if (this.cursors.shift.isDown) {
      this.player.anims.play("shoot", true);
    }

    if (this.cursors.space.isDown) {
      this.player.anims.play("melee", true);
    }

    if (this.keys.E.isDown) {
      this.player.anims.play("reload", true);
    }

    if (
      !(
        this.player.anims.getName() === "shoot" ||
        this.player.anims.getName() === "melee" ||
        this.player.anims.getName() === "reload"
      )
    ) {
      if (this.keys.W.isDown || this.keys.A.isDown || this.keys.D.isDown) {
        this.player.anims.play("move", true);
      }

      if (this.keys.S.isDown) {
        this.player.anims.playReverse("move", true);
      }
    }

    if (!this.player.anims.isPlaying) {
      this.player.anims.play("idle", true);
    }
  }
}
