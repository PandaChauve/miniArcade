var game = new Phaser.Game(800, 600, Phaser.AUTO, "content", { preload: preload, create: create, update: update });

var worldStage;
var mapSpr;


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
    screen = new Screen(game, 2);
    var overlay = new BoxOverlay(new BaseOverlay(game), 0x000000);
    screen.setMinimap(world, overlay);
    screen.setCamera(0, world, viewPortRect, overlay);
    screen.setCamera(1, world, viewPortRect, overlay);
}

function move(x,y)
{
    x+=viewPortRect.position.x;
    y+=viewPortRect.position.y;
    viewPortRect.position.x = Math.max(0, Math.min(1900,
        x  ));
    viewPortRect.position.y = Math.max(0, Math.min(1000,
        y  ));
}
function update() {
    move(1.5, 1);
    screen.update();
}