
enum Color {
    RED,
    BLUE,
    GREEN,
}
const colors = [Color.RED, Color.BLUE, Color.GREEN]
let newX2 = 0
let newX = 0
let mySprite: Sprite = null
let gridWidth = 0
let enemySpeed = 90
let amountOfGrids = 3
let amountOfRows = 4
let screenCenter = scene.screenWidth() / 2
let gridOffset = scene.screenWidth() / amountOfGrids / 2
gridWidth = scene.screenWidth() / amountOfGrids
const grids = {
  left: gridWidth - gridOffset,
  center: gridWidth * 2 - gridOffset,
  right: gridWidth * 3 - gridOffset,
}
let rowHeight = scene.screenHeight() / amountOfRows
let rowOffset = rowHeight / 2
const colorVsMyImage = {
    [Color.BLUE]: assets.image`ah blue`,
    [Color.RED]: assets.image`ah red`,
    [Color.GREEN]: assets.image`ah green`,
}
const createMe = (color: Color) => {
    const sprite = sprites.create(colorVsMyImage[color], SpriteKind.Player)
    sprite.y = scene.screenHeight() / 10 * 9
    sprite.x = grids.center
    sprite.data = {color}
    return sprite
}

let enemyInitY = rowHeight * 1 - rowOffset
const colorVsEnemyImage = {
    [Color.BLUE]: assets.image`Blue Obstacle`,
    [Color.RED]: assets.image`Red Obstacle`,
    [Color.GREEN]: assets.image`Green Obstacle`,
}

const createEnemy = (color: Color, gridKey: keyof typeof grids) => {
    const sprite = sprites.create(colorVsEnemyImage[color], SpriteKind.Enemy)
    sprite.setStayInScreen(true)
    sprite.setPosition(grids[gridKey], enemyInitY)
    sprite.setVelocity(0, enemySpeed)
    sprite.data = { color }
    return sprite
}

const changeMyColor = (color: Color) => {
    mySprite.data.color = color
    mySprite.setImage(colorVsMyImage[color])
}

mySprite = createMe(Color.RED)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (me, enemy) {
    if (me.data.color === enemy.data.color) {
        console.log('booom')
        game.over(false)
    } else {
        enemy.destroy(effects.ashes, 1)
        changeMyColor(enemy.data.color)
    }
})

const randomBetween = (minimum: number, maximum: number) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
const randomItemFromArray = <T>(items: T[]): T => items[Math.floor(Math.random()*items.length)];

const randomEnum: <T>(anEnum: T) => T[keyof T] = <T>(anEnum: T) => {
  const enumValues = Object.keys(anEnum)
    .map((n: string) => parseInt(n, 10))
    .filter(n => !Number.isNaN(n)) as any as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue;
}

const randomObjKey = <K extends keyof O, O extends object>(obj: O): K => {
    const keys = Object.keys(obj)
    return randomItemFromArray(keys) as K
}

const randomObjValue = <V>(obj: {[_: string]: V}): V => {
    const keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]]
}

forever(function() {
    createEnemy(randomItemFromArray(colors), randomObjKey(grids))
    pause(randomBetween(100, 500))
})