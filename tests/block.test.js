const Block = require("../src/server/scripts/block.js");

test('contructor success', () => {
    const item = new Block(3.2, 7.8);
    expect(item.x).toBe(3);
    expect(item.y).toBe(7);
    expect(item.pos.x).toBe(3.2);
    expect(item.pos.y).toBe(7.8);
    expect(item.offset.x).toBeCloseTo(0.2, 5);
    expect(item.offset.y).toBeCloseTo(0.8, 5);
});
