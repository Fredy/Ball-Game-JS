import {TileType} from './mapReader'

const generatorMapper = {
  w: TileType.SQUARE_WALL,
  p: TileType.START,
  h: TileType.HOLE,
};

export function mapGenerator(map) {
  const result = [];
  map.forEach((row, y) => {
    row.split('').forEach((v, x) => {
      if (v === ' ') {
        return;
      }
      result.push({
        position: [x, y],
        type: generatorMapper[v],
        orientation: 'up',
      });
    });
  });

  return result;
}

