controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
  newX = mySprite.x - gridWidth
  // TODO: not sure why need the hack
  if (newX >= grids.left - 1) {
      mySprite.x = newX
  }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
  newX2 = mySprite.x + gridWidth
  if (newX2 <= grids.right) {
      mySprite.x = newX2
  }
})
// mySprite.fill(5)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
  mySprite.setImage(img`
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      . . . . . . . . . . . . . . . .
      `)
})
let newX2 = 0
let newX = 0
let mySprite: Sprite = null
let gridWidth = 0
let enemySpeed = 90
let amountOfGrids = 3
let amountOfColumns = 4
mySprite = sprites.create(assets.image`ah red`, SpriteKind.Player)
let screenCenter = scene.screenWidth() / 2
let gridOffset = scene.screenWidth() / amountOfGrids / 2
gridWidth = scene.screenWidth() / amountOfGrids
const grids = {
  left: gridWidth - gridOffset,
  center: gridWidth * 2 - gridOffset,
  right: gridWidth * 3 - gridOffset,
}
let columnHeight = scene.screenWidth() / amountOfColumns
let columnOffset = columnHeight / 2
let enemyInitY = columnHeight * 1 - columnOffset
mySprite.y = scene.screenHeight() / 10 * 9
mySprite.x = grids.center
let box = sprites.create(assets.image`Blue Obstacle`, SpriteKind.Enemy)
box.setStayInScreen(true)
box.setPosition(screenCenter, enemyInitY)
box.setVelocity(0, enemySpeed)
