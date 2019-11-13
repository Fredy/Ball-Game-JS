
example = [
    'wwwwwwwwww',
    'w        w',
    'w wwwwww w',
    'w wwwwww w',
    'w wwwwww w',
    'w        w',
    'wwwwwwwwww',
]

SQUARE_WALL= 1
START= 2
END= 3
HOLE= 4

types = dict(
    w=SQUARE_WALL
)

for y, row in enumerate(example):
    for x,i in enumerate(row):
        tile_data = f"{{"
                    f"position: [{x , y}],"
                    f"type: {types[i]},"
                    f"orientation: 'up'"
                    f"}}"



