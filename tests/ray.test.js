const { Ray } = require("../src/scripts/ray");

test("constructor success", () => {
    let ray = new Ray({ angle: 10 }, 20);
    expect(ray.angle).toBe(20);
    expect(ray.view.angle).toBe(10);
});

test("calcAngle success 1", () => {
    let ray = new Ray({ person: { angle: Math.PI * 1.5 } }, Math.PI * 0.5 + Math.PI / 6);
    expect(ray.calcAngle()).toBeCloseTo(Math.PI / 6, 5);
});

test("calcAngle success 2", () => {
    let ray = new Ray({ person: { angle: Math.PI } }, Math.PI * 0.5 + Math.PI / 6);
    expect(ray.calcAngle()).toBeCloseTo(Math.PI * 1.5 + Math.PI / 6, 5);
});


test("calcDirY success 1", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 0.5);
    expect(ray.calcDirY()).toBe(1);
});

test("calcDirY success 2", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 1.5);
    expect(ray.calcDirY()).toBe(-1);
});

test("calcDirY success 3", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI);
    expect(ray.calcDirY()).toBe(0);
});

test("calcDirX success 1", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 2);
    expect(ray.calcDirX()).toBe(1);
});

test("calcDirX success 2", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI);
    expect(ray.calcDirX()).toBe(-1);
});

test("calcDirX success 3", () => {
    let ray = new Ray({ person: { angle: 0 } }, Math.PI * 0.5);
    expect(ray.calcDirX()).toBe(0);
});



test("calcDistHorizontal success 1", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, Math.PI / 6);
    expect(ray.calcDistHorizontal()).toBeCloseTo(1.38564, 5);
});

test("calcDistHorizontal success 2", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } },  Math.PI + Math.PI / 3);
    expect(ray.calcDistHorizontal()).toBeCloseTo(0.11547, 5);
});

test("calcDistHorizontal success 3", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, 0);
    expect(ray.calcDistHorizontal()).toBeCloseTo(0, 5);
});

test("calcDistHorizontal success 4", () => {
    let ray = new Ray({ person: { offset: { y: 0.2 }, angle: 0 } }, Math.PI);
    expect(ray.calcDistHorizontal()).toBeCloseTo(0, 5);
});





test("calcDistVertical success 1", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI / 6);
    expect(ray.calcDistVertical()).toBeCloseTo(1.21244, 5);
});

test("calcDistVertical success 2", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } },  Math.PI + Math.PI / 3);
    expect(ray.calcDistVertical()).toBeCloseTo(0.17321, 5);
});

test("calcDistVertical success 3", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI * 0.5);
    expect(ray.calcDistVertical()).toBe(0, 5);
});

test("calcDistVertical success 4", () => {
    let ray = new Ray({ person: { offset: { x: 0.3 }, angle: 0 } }, Math.PI * 1.5);
    expect(ray.calcDistVertical()).toBeCloseTo(0, 5);
});