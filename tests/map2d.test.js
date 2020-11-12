const { Map2d } = require("../src/scripts/map2d");

test('create success', () => {
    const map2d = Map2d.create(pattern1, { });
    expect(map2d.walls.length).toBe(14);
    expect(map2d.items.length).toBe(3);
    expect(map2d.size.x).toBe(5);
    expect(map2d.size.y).toBe(4);

    expect(map2d.walls[0].typeId).toBe(0);
    expect(map2d.walls[0].block.x).toBe(0);
    expect(map2d.walls[0].block.y).toBe(0);
    expect(map2d.walls[1].typeId).toBe(1);
    expect(map2d.walls[1].block.x).toBe(1);
    expect(map2d.walls[1].block.y).toBe(0);
    expect(map2d.walls[2].typeId).toBe(2);
    expect(map2d.walls[2].block.x).toBe(2);
    expect(map2d.walls[2].block.y).toBe(0);
    expect(map2d.walls[3].typeId).toBe(3);
    expect(map2d.walls[3].block.x).toBe(3);
    expect(map2d.walls[3].block.y).toBe(0);
    expect(map2d.walls[4].typeId).toBe(4);
    expect(map2d.walls[4].block.x).toBe(4);
    expect(map2d.walls[4].block.y).toBe(0);
    expect(map2d.walls[5].typeId).toBe(5);
    expect(map2d.walls[5].block.x).toBe(0);
    expect(map2d.walls[5].block.y).toBe(1);
    expect(map2d.walls[6].typeId).toBe(6);
    expect(map2d.walls[6].block.x).toBe(4);
    expect(map2d.walls[6].block.y).toBe(1);
    expect(map2d.walls[7].typeId).toBe(7);
    expect(map2d.walls[7].block.x).toBe(0);
    expect(map2d.walls[7].block.y).toBe(2);
    expect(map2d.walls[8].typeId).toBe(8);
    expect(map2d.walls[8].block.x).toBe(4);
    expect(map2d.walls[8].block.y).toBe(2);
    expect(map2d.walls[9].typeId).toBe(9);
    expect(map2d.walls[9].block.x).toBe(0);
    expect(map2d.walls[9].block.y).toBe(3);
    expect(map2d.walls[10].typeId).toBe(10);
    expect(map2d.walls[10].block.x).toBe(1);
    expect(map2d.walls[10].block.y).toBe(3);
    expect(map2d.walls[11].typeId).toBe(11);
    expect(map2d.walls[11].block.x).toBe(2);
    expect(map2d.walls[11].block.y).toBe(3);
    expect(map2d.walls[12].typeId).toBe(12);
    expect(map2d.walls[12].block.x).toBe(3);
    expect(map2d.walls[12].block.y).toBe(3);
    expect(map2d.walls[13].typeId).toBe(13);
    expect(map2d.walls[13].block.x).toBe(4);
    expect(map2d.walls[13].block.y).toBe(3);


    expect(map2d.items[0].typeId).toBe(56);
    expect(map2d.items[0].block.x).toBe(2);
    expect(map2d.items[0].block.y).toBe(1);
    expect(map2d.items[1].typeId).toBe(57);
    expect(map2d.items[1].block.x).toBe(1);
    expect(map2d.items[1].block.y).toBe(2);
    expect(map2d.items[2].typeId).toBe(58);
    expect(map2d.items[2].block.x).toBe(3);
    expect(map2d.items[2].block.y).toBe(2);
    

    expect(map2d.blocks[0][0]).toBe(map2d.walls[0]);
    expect(map2d.blocks[1][0]).toBe(map2d.walls[1]);
    expect(map2d.blocks[2][0]).toBe(map2d.walls[2]);
    expect(map2d.blocks[3][0]).toBe(map2d.walls[3]);
    expect(map2d.blocks[4][0]).toBe(map2d.walls[4]);
    expect(map2d.blocks[0][1]).toBe(map2d.walls[5]);
    expect(map2d.blocks[1][1]).toBe(undefined);
    expect(map2d.blocks[2][1]).toBe(map2d.items[0]);
    expect(map2d.blocks[3][1]).toBe(undefined);
    expect(map2d.blocks[4][1]).toBe(map2d.walls[6]);
    expect(map2d.blocks[0][2]).toBe(map2d.walls[7]);
    expect(map2d.blocks[1][2]).toBe(map2d.items[1]);
    expect(map2d.blocks[2][2]).toBe(undefined);
    expect(map2d.blocks[3][2]).toBe(map2d.items[2]);
    expect(map2d.blocks[4][2]).toBe(map2d.walls[8]);
    expect(map2d.blocks[0][3]).toBe(map2d.walls[9]);
    expect(map2d.blocks[1][3]).toBe(map2d.walls[10]);
    expect(map2d.blocks[2][3]).toBe(map2d.walls[11]);
    expect(map2d.blocks[3][3]).toBe(map2d.walls[12]);
    expect(map2d.blocks[4][3]).toBe(map2d.walls[13]);
    
});

const pattern1 = `
0001020304
05  38  06
0739  3A08
090A0B0C0D
`