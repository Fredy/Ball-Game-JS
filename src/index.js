import './global';
import { Game } from './scenes';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

const config = {
  type: Phaser.WEBGL,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  backgroundColor: '#eeeeee',
  parent: 'content',
  state: Game,
};

const game = new Phaser.Game(config);
