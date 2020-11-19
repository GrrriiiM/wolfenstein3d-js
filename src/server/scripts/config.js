const Config = {
    rayCount: 200,
    playerMoveVelocity: 0.1,
    playerRotateVelocity: Math.PI / 20,
    wallsImageName: 'wall-textures.png',
    spritesImageName: 'sprites.png',
    map2dWallImageIdRange: 55,
    map2dSpriteImageIdRange: 155
}

module && (module.exports = Config)