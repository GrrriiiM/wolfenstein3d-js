const { Base } = require("../src/scripts/base.js");

test('contructor success', () => {
    const item = new Base(50, 95, 30);
    expect(item.x).toBe(50);
    expect(item.y).toBe(95);
    expect(item.block.x).toBe(1);
    expect(item.block.y).toBe(3);
    expect(item.offset.x).toBe(20);
    expect(item.offset.y).toBe(5);
});
