const { Vector2d } = require("../src/scripts/vector2d")

test('contructor success', () => {
    const v = new Vector2d(5, 10);
    expect(v.x).toBe(5);
    expect(v.y).toBe(10);
});

test('set success', () => {
    const v = new Vector2d(5, 10);
    v.set(new Vector2d(8, 16))
    expect(v.x).toBe(8);
    expect(v.y).toBe(16);
});

test('setXY success', () => {
    const v = new Vector2d(5, 10);
    v.setXY(2, 1)
    expect(v.x).toBe(2);
    expect(v.y).toBe(1);
});

test('copy success', () => {
    const v = new Vector2d(5, 10);
    const v1 = v.copy();
    expect(v1).not.toBe(v);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(10);
});


test('add success', () => {
    const v1 = new Vector2d(5, 10);
    const v2 = new Vector2d(2, 3);
    v1.add(v2);
    expect(v1.x).toBe(7);
    expect(v1.y).toBe(13);
});

test('sub success', () => {
    const v1 = new Vector2d(5, 10);
    const v2 = new Vector2d(2, 3);
    v1.sub(v2);
    expect(v1.x).toBe(3);
    expect(v1.y).toBe(7);
});

test('mult success', () => {
    const v1 = new Vector2d(5, 10);
    v1.mult(3);
    expect(v1.x).toBe(15);
    expect(v1.y).toBe(30);
});

test('div success', () => {
    const v1 = new Vector2d(5, 10);
    v1.div(2);
    expect(v1.x).toBe(2.5);
    expect(v1.y).toBe(5);
});

test('rotate success', () => {
    const v1 = new Vector2d(5, 10);
    v1.rotate(Math.PI * 1.5);
    expect(v1.x).toBeGreaterThanOrEqual(9.99999999);
    expect(v1.x).toBeLessThanOrEqual(10.0001);
    expect(v1.y).toBeGreaterThanOrEqual(-5.000001);
    expect(v1.y).toBeLessThanOrEqual(-4.999999);
});

test('floor success', () => {
    const v1 = new Vector2d(5.9, 10.1);
    v1.floor();
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(10);
});

test('mag success', () => {
    const v1 = new Vector2d(5, 10);
    expect(v1.mag).toBe(11.180339887498949);
});

test('ang success', () => {
    const v1 = new Vector2d(5, 10);
    expect(v1.ang).toBe(1.1071487177940904);
});