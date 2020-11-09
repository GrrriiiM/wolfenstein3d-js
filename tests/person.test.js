const { Config } = require("../src/config");
const { Person } = require("../src/scripts/person");

test('contructor success', () => {
    const config = {
        blockSize: 10
    };
    const person = new Person(10, 20, Math.PI, 200, { config: config });
    expect(person.x).toBe(105);
    expect(person.y).toBe(205);
    expect(person.view.angle).toBe(Math.PI)
});

test('rotate success', () => {
    const config = {
        blockSize: 10,
        playerRotateVelocity: Math.PI / 2
    };
    const person = new Person(10, 20, 0, 200, { config: config });
    person.rotateRight();
    expect(person.view.angle).toBe(Math.PI / 2);
    person.rotateRight();
    expect(person.view.angle).toBe(Math.PI);
    person.rotateRight();
    expect(person.view.angle).toBe(Math.PI * 1.5);
    person.rotateRight();
    expect(person.view.angle).toBe(0);
    person.rotateRight();
    expect(person.view.angle).toBe(Math.PI / 2);
    person.rotateLeft();
    expect(person.view.angle).toBe(0);
    person.rotateLeft();
    expect(person.view.angle).toBe(Math.PI * 1.5);
})

test('move success', () => {
    const config = {
        blockSize: 10,
        playerMoveVelocity: 1,
        playerRotateVelocity: Math.PI / 2
    };
    const person = new Person(10, 20, 0, 200, { config: config });
    person.moveFront();
    expect(person.x).toBe(106);
    expect(person.y).toBe(205);
    person.moveRight();
    expect(person.x).toBe(106);
    expect(person.y).toBe(206);
    person.moveBack();
    expect(person.x).toBe(105);
    expect(person.y).toBe(206);
    person.moveLeft();
    expect(person.x).toBe(105);
    expect(person.y).toBe(205);

    person.rotateRight();
    person.moveFront();
    expect(person.x).toBe(105);
    expect(person.y).toBe(206);
    person.moveRight();
    expect(person.x).toBe(104);
    expect(person.y).toBe(206);
    person.moveBack();
    expect(person.x).toBe(104);
    expect(person.y).toBe(205);
    person.moveLeft();
    expect(person.x).toBe(105);
    expect(person.y).toBe(205);
});