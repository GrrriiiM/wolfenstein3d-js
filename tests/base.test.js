const { Base } = require("../src/scripts/base.js");

test('contructor success', () => {
    const item = new Base(3.2, 7.8);
    expect(item.x).toBe(3.2);
    expect(item.y).toBe(7.8);
    expect(item.block.x).toBe(3);
    expect(item.block.y).toBe(7);
    expect(item.offset.x).toBeCloseTo(0.2, 5);
    expect(item.offset.y).toBeCloseTo(0.8, 5);
});
