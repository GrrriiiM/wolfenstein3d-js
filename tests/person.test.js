const { Person } = require("../src/server/person");

test('contructor success', () => {
    const config = {        
    };
    const person = new Person(10, 20, Math.PI, 200, { config: config });
    expect(person.x).toBe(10);
    expect(person.y).toBe(20);
    expect(person.view.angle).toBe(Math.PI)
});

test('rotate success', () => {
    const config = {
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
        playerMoveVelocity: 1,
        playerRotateVelocity: Math.PI / 2
    };
    const person = new Person(10, 20, 0, 200, { config: config });
    person.moveFront();
    expect(person.x).toBe(11);
    expect(person.y).toBe(20);
    person.moveRight();
    expect(person.x).toBe(11);
    expect(person.y).toBe(21);
    person.moveBack();
    expect(person.x).toBe(10);
    expect(person.y).toBe(21);
    person.moveLeft();
    expect(person.x).toBe(10);
    expect(person.y).toBe(20);

    person.rotateRight();
    person.moveFront();
    expect(person.x).toBe(10);
    expect(person.y).toBe(21);
    person.moveRight();
    expect(person.x).toBe(9);
    expect(person.y).toBe(21);
    person.moveBack();
    expect(person.x).toBe(9);
    expect(person.y).toBe(20);
    person.moveLeft();
    expect(person.x).toBe(10);
    expect(person.y).toBe(20);
});