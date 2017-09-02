var game = new Phaser.Game(800, 600, Phaser.AUTO, "content", { preload: preload, create: create, update: update, render : render });

var worldStage;
var cursors;
var layer;
var ship;
var ship2;

function preload() {
    game.time.advancedTiming = true; //fpc counter
    game.load.tilemap('tiles', '../tuto2/assets/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', '../tuto2/assets/ground_1x1.png');
    game.load.image('walls_1x2', '../tuto2/assets/walls_1x2.png');
    game.load.image('tiles2', '../tuto2/assets/tiles2.png');
    game.load.image('ship', '../tuto2/assets/thrust_ship2.png');
}
var screen;
function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    worldStage = game.add.group();
    //worldStage = new Phaser.Group(game, null);

    game.stage.backgroundColor = '#ffffff';

     mapSpr = new Phaser.Tilemap(game, 'tiles');

    mapSpr.addTilesetImage('ground_1x1');
    mapSpr.addTilesetImage('walls_1x2');
    mapSpr.addTilesetImage('tiles2');

    layer = mapSpr.createLayer('Tile Layer 1');
    layer.resizeWorld();
   worldStage.addChild(layer);
    mapSpr.setCollisionBetween(1, 12);
    game.physics.p2.convertTilemap(mapSpr, layer);
    ship = worldStage.addChild(new Phaser.Sprite(game, 200, 200, 'ship'));
    worldStage.sch = "worldstage";
    game.physics.p2.enable(ship);
    ship.sch = "ship";
    //ship.body.debug = true;
    //ship2 = worldStage.addChild(new Phaser.Sprite(game, 300, 200, 'ship'));
    //game.physics.p2.enable(ship2);

   game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    var world = new CameraWorld(worldStage, 1500,600);//mapSpr.width, mapSpr.height);
    screen = new Screen(game,1);
    var overlay = new BoxOverlay(new BaseOverlay(game), 0x000000);
    screen.setMinimap(world, overlay);
    screen.setCamera(0, world, ship, overlay);
    //screen.setCamera(1, world, ship2, overlay);

    cursors = game.input.keyboard.createCursorKeys();



}

function update() {

    screen.update();

    if (cursors.left.isDown)
    {
        ship.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ship.body.rotateRight(100);
    }
    else
    {
        ship.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        ship.body.thrust(400);
        //ship.y += 1;
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
        //ship.body.reverse(400);
    }
    //ship.postUpdate();

}

function render()
{
    game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
}