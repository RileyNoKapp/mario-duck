scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    startNextLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -150
})
function startNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentLevel += 1
    if (currentLevel == 1) {
        tiles.setTilemap(tilemap`platformer10`)
    } else if (currentLevel == 2) {
        tiles.setTilemap(tilemap`level02`)
    } else if (currentLevel == 3) {
        tiles.setTilemap(tilemap`platformer12`)
    } else if (currentLevel == 4) {
        tiles.setTilemap(tilemap`platformer1`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        myEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 1 1 3 2 2 2 1 1 4 4 . . 
            . . 3 3 1 f 3 2 2 2 1 f 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 f 3 2 2 2 4 4 4 4 f 4 4 . 
            . 4 4 f f 2 2 4 4 4 4 f f 4 4 . 
            . 4 2 3 f f 2 4 4 4 f f 4 4 4 . 
            . . 4 2 3 f f f f f f 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.follow(mySprite, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        mySprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let myEnemy: Sprite = null
let currentLevel = 0
let mySprite: Sprite = null
scene.setBackgroundColor(11)
mySprite = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . . . . b c . . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    b d d d b b d 5 5 5 4 4 4 4 4 b 
    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
    c d d c d 5 5 b 5 5 5 5 5 5 b . 
    c b d d c c b 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
startNextLevel()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            } else if (value.vx < 0 && value.tileKindAt(TileDirection.Right, assets.tile`tile1`)) {
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            mySprite.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            mySprite.vx = -30
        }
    }
})
