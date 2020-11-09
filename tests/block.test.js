import { Block } from "../src/scripts/block";

test('contructor success', () => {
    const block = new Block(1, 2, 32);
    expect(block.x).toBe(1);
    expect(block.y).toBe(2);
    expect(block.size).toBe(32);
    expect(block.min.x).toBe(32);
    expect(block.min.y).toBe(64);
    expect(block.max.x).toBe(64);
    expect(block.max.y).toBe(96);
    expect(block.center.x).toBe(48);
    expect(block.center.y).toBe(80);
});

test('setXY success', () => {
    const block = new Block(0, 1, 32);
    block.setXY(1, 2);
    expect(block.x).toBe(1);
    expect(block.y).toBe(2);
    expect(block.size).toBe(32);
    expect(block.min.x).toBe(32);
    expect(block.min.y).toBe(64);
    expect(block.max.x).toBe(64);
    expect(block.max.y).toBe(96);
    expect(block.center.x).toBe(48);
    expect(block.center.y).toBe(80);
});

test('set x success', () => {
    const block = new Block(0, 1, 32);
    block.x = 1;
    expect(block.x).toBe(1);
    expect(block.y).toBe(1);
    expect(block.size).toBe(32);
    expect(block.min.x).toBe(32);
    expect(block.min.y).toBe(32);
    expect(block.max.x).toBe(64);
    expect(block.max.y).toBe(64);
    expect(block.center.x).toBe(48);
    expect(block.center.y).toBe(48);
});

test('set y success', () => {
    const block = new Block(0, 1, 32);
    block.y = 2;
    expect(block.x).toBe(0);
    expect(block.y).toBe(2);
    expect(block.size).toBe(32);
    expect(block.min.x).toBe(0);
    expect(block.min.y).toBe(64);
    expect(block.max.x).toBe(32);
    expect(block.max.y).toBe(96);
    expect(block.center.x).toBe(16);
    expect(block.center.y).toBe(80);
});

test('contain success', () => {
    const block = new Block(1, 2, 32);
    expect(block.contain({ x: 32, y: 64 })).toBe(true);
    expect(block.contain({ x: 32, y: 63 })).toBe(false);
    expect(block.contain({ x: 31, y: 64 })).toBe(false);
    expect(block.contain({ x: 63, y: 64 })).toBe(true);
    expect(block.contain({ x: 64, y: 64 })).toBe(false);
    expect(block.contain({ x: 63, y: 95 })).toBe(true);
    expect(block.contain({ x: 63, y: 96 })).toBe(false);
    expect(block.contain({ x: 40, y: 70 })).toBe(true);
    expect(block.contain({ x: 0, y: 0 })).toBe(false);
    expect(block.contain({ x: 100, y: 100 })).toBe(false);
});