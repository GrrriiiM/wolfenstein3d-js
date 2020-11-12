const { View } = require("../src/scripts/view")

test('contructor success', () => {
    let view = new View({}, Math.PI);
    expect(view.angle).toBe(Math.PI);
});

test('angle success', () => {
    let view = new View({}, Math.PI);
    view.angle += Math.PI * 0.5;
    expect(view.angle).toBe(Math.PI * 1.5);
    expect(view.angleMin).toBe((view.angle - Math.PI / 6) % (Math.PI * 2));
    expect(view.angleMax).toBe((view.angle + Math.PI / 6) % (Math.PI * 2));
    view.angle += Math.PI;
    expect(view.angle).toBe(Math.PI * 0.5);
    expect(view.angleMin).toBe((view.angle - Math.PI / 6) % (Math.PI * 2));
    expect(view.angleMax).toBe((view.angle + Math.PI / 6) % (Math.PI * 2));
    view.angle -= Math.PI * 1.5;
    expect(view.angle).toBe(Math.PI);
    expect(view.angleMin).toBe((view.angle - Math.PI / 6) % (Math.PI * 2));
    expect(view.angleMax).toBe((view.angle + Math.PI / 6) % (Math.PI * 2));
});