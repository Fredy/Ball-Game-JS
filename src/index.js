import phaser from "phaser";
import { Game } from "./scenes";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";

const config = {
  type: phaser.WEBGL,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  parent: "content",
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0, x:0 } //We don't need gravity for this game
    },
  },
  scene: [Game]
};

const game = new phaser.Game(config);
