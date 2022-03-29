import Phaser from "phaser";
import Scene1 from "./scenes/Scene1";

const config = {
  type: Phaser.AUTO,
  parent: "mers-alpha",
  width: 800,
  height: 600,
  scene: Scene1,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
