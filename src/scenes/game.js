import { Scene } from 'phaser';
import basicTile from '../../assets/basic_tile.png';
import ball from '../../assets/ball.png';
import hole from '../../assets/hole.png';
import { TileType, WINDOW_HEIGHT, WINDOW_WIDTH, TILE_SIZE } from '../constants';
import { parseMapData } from '../utils/mapReader';
import { mapGenerator } from '../utils/mapGenerator';

const BALL = 'ball';

const CollissionCategory = {
  BALL: 1,
  WALL: 2,
};

const example = [
  'wwwwwwwwww',
  'w        w',
  'w ww  ww w',
  'w   hh   w',
  'w ww  ww w',
  'w   p    w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'wwwwwwwwww',
];

export default class Game extends Scene {
  constructor() {
    super({
      key: 'game',
    });
  }

  preload() {
    this.load.image(TileType.BASIC, basicTile);
    this.load.image(BALL, ball);
    this.load.image(TileType.HOLE, hole);
  }

  create() {
    const walls = [];
    const map = mapGenerator(example);
    console.log(map);
    const mapData = parseMapData(map);
    mapData.tiles.forEach((params) => {
      walls.push(
        this.matter.add
          .image(...params)
          .setStatic(true)
          .setCollisionCategory(CollissionCategory.WALL)
          .setCollidesWith(CollissionCategory.BALL)
      );
    });

    mapData.holes.forEach((params) => this.add.image(...params));

    const playerPos = mapData.start;
    this.player = this.matter.add
      .image(playerPos.x, playerPos.y, BALL)
      .setScale(0.9);
    this.player.setCircle(TILE_SIZE / 2); //this doesn't work as expected
    this.player.setBounce(0.2);
    this.player
      .setCollisionCategory(CollissionCategory.BALL)
      .setCollidesWith(CollissionCategory.WALL);

    // this.matter.add.collider(walls, this.player);

    const cam = this.cameras.main;
    cam.setBounds(
      -TILE_SIZE / 2,
      -TILE_SIZE / 2,
      mapData.bounds.right,
      mapData.bounds.bottom
    );

    cam.startFollow(this.player);
    cam.setBackgroundColor(0xeeeeee);

    this.cursors = this.input.keyboard.createCursorKeys();
    // cam.setViewport(0, 0, 270, 480);
    // NOTE: Game Objects are positioned based on their center by default. here
    // all the objects have their center in 0,0. To modify this use .setOrigin()
    // cam.centerOn(0, 0);
  }

  update(time, delta) {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-6);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(6);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(6);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-6);
    } else {
      this.player.setVelocity(0);
    }
  }
}
