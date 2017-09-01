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
function create() {

    // Create world stage, DON'T add it to the game's stage or world group
    worldStage = new Phaser.Group(game, null);
    // Create the map sprite and add it to the world stage (NOT the game's stage or
    //  world group)
    mapSpr = new Phaser.Sprite(game, 0, 0, "map");
    worldStage.addChild(mapSpr);

    // Create main camera, displaying 400x300 (by default) pixels of the world, at
    // screen position {0, 0} and screen size 800x600 (full screen of the game)
    mainCamera = new Camera(game, mainCameraWidth, mainCameraHeight, 0, 0, 1920/2, 1080);
    // Set display target of the camera to the world stage
    mainCamera.setDisplayTarget(worldStage);
    game.world.addChild(mainCamera.view);

    // Set the main camera's bounds to the map
    mainCamera.bounds.width = mapSpr.width;
    mainCamera.bounds.height = mapSpr.height;



    var viewPortRect2 = new Phaser.Graphics(game);
    viewPortRect2.beginFill(0x000000, 0);
    viewPortRect2.lineStyle(50, 0x00ffff);
    viewPortRect2.drawRect(0, 0, 50, 50);
    viewPortRect2.endFill();
    viewPortRect = new Phaser.Group(game);
    viewPortRect.addChild(viewPortRect2);
    worldStage.addChild(viewPortRect);

    mainCamera.followObject(viewPortRect);

    // Create main camera, displaying 400x300 (by default) pixels of the world, at
    // screen position {0, 0} and screen size 800x600 (full screen of the game)
    mainCamera2 = new Camera(game, mainCameraWidth, mainCameraHeight, 1920/2, 0, 1920/2, 1080);
    // Set display target of the camera to the world stage
    mainCamera2.setDisplayTarget(worldStage);
    game.world.addChild(mainCamera2.view);

    // Set the main camera's bounds to the map
    mainCamera2.bounds.width = mapSpr.width;
    mainCamera2.bounds.height = mapSpr.height;


    // Create minimap camera, displaying the whole map sprite in size, at screen
    // position {0, 450} and screen size 100x150 (600 - 150 = 450, so it will be
    //  displayed in the bottom-left of the screen)
    minimapCamera = new Camera(game, mapSpr.width, mapSpr.height, 1920/2-75, 1080-150, 150, 150);
    game.world.addChild(minimapCamera.view);
    minimapCamera.setDisplayTarget(worldStage);

}
function move(x,y)
{
    x+=viewPortRect.position.x;
    y+=viewPortRect.position.y;
    console.log(x);
    viewPortRect.position.x = Math.max(0, Math.min(mainCamera.bounds.right - 50,
        x  ));
    viewPortRect.position.y = Math.max(0, Math.min(mainCamera.bounds.bottom - 50,
        y  ));
    console.log(viewPortRect.position.x);
}
function update() {
    // Move the main camera around the map

    move(1, 1);

    // Important!
    // Render the cameras between game logic updates and the actual rendering of
    // the game
    mainCamera.render();
    mainCamera2.render();
    minimapCamera.render();
}