import { TileType as TextureTile, TILE_SIZE } from '../constants';

export const TileType = {
  SQUARE_WALL: 1,
  START: 2,
  END: 3,
  HOLE: 4,
};

export function parseMapData(mapData) {
  const bounds = { bottom: -TILE_SIZE, right: -TILE_SIZE };
  const tiles = [];
  const holes = [];
  let start;
  let end;

  mapData.forEach((data) => {
    const x = data.position[0] * TILE_SIZE;
    const y = data.position[1] * TILE_SIZE;
    const { type } = data;

    switch (type) {
      case TileType.SQUARE_WALL:
        tiles.push([x, y, TextureTile.BASIC]);
        break;
      case TileType.HOLE:
        holes.push([x, y, TextureTile.HOLE]);
        break;
      case TileType.START:
        start = { x, y };
        break;
      case TileType.END:
        end = { x, y };
        break;
      default:
        break;
    }

    // Update bounds:
    if (x > bounds.right) {
      bounds.right = x;
    }
    if (y > bounds.bottom) {
      bounds.bottom = y;
    }
  });

  // Fixing bounds to include the border tiles:
  bounds.bottom += TILE_SIZE;
  bounds.right += TILE_SIZE;

  return { tiles, holes, start, end, bounds };
}
