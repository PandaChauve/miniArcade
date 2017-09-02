var game = new Phaser.Game(1920, 1080, Phaser.AUTO, "content", { preload: preload, create: create, update: update });

var container;
var worldStage;
var mapSpr;

var mainCamera;
var mainCamera2;
var minimapCamera;

var dir = "down";
var camSpeed = 8;

var mainCameraWidth = 1920/2;
var mainCameraHeight = 1080;

function preload() {
    game.load.image("map", "../tuto2/assets/sky.png");
}
var viewPortRect;
var screen;
function create() {

    // Create world stage, DON'T add it to the game's stage or world group
    worldStage = new Phaser.Group(game, null);
    // Create the map sprite and add it to the world stage (NOT the game's stage or
    //  world group)
    mapSpr = new Phaser.Sprite(game, 0, 0, "map");
    worldStage.addChild(mapSpr);

    var viewPortRect2 = new Phaser.Graphics(game);
    viewPortRect2.beginFill(0x000000, 0);
    viewPortRect2.lineStyle(50, 0x00ffff);
    viewPortRect2.drawRect(0, 0, 50, 50);
    viewPortRect2.endFill();
    viewPortRect = new Phaser.Group(game);
    viewPortRect.addChild(viewPortRect2);
    worldStage.addChild(viewPortRect);

    var world = new CameraWorld(worldStage, mapSpr.width, mapSpr.height);
    screen = new Screen(game, 4);
    screen.setMinimap(world);
    screen.setCamera(0, world, viewPortRect);
    screen.setCamera(1, world, viewPortRect);
    screen.setCamera(2, world, viewPortRect);
    screen.setCamera(3, world, viewPortRect);
}

function move(x,y)
{
    x+=viewPortRect.position.x;
    y+=viewPortRect.position.y;
    viewPortRect.position.x = Math.max(0, Math.min(1920,
        x  ));
    viewPortRect.position.y = Math.max(0, Math.min(1080,
        y  ));
}
function update() {
    move(1, 1);
    screen.update();
}