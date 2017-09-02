
function CameraWorld(world, width, height)
{
    this.world = world;
    this.width = width ? width : world.width;
    this.height = height ? height : world.height;
}

function BoxOverlay(game, color)
{
    this.game = game;
    this.color = color;
    this.setPort = function(port)
    {
        this.view.x = port.x;
        this.view.y = port.y;

        var viewPortRect2 = new Phaser.Graphics(this.game);
        viewPortRect2.beginFill(color, 0);
        viewPortRect2.lineStyle(1, color);
        viewPortRect2.drawRect(0, 0, port.width, port.height);
        viewPortRect2.endFill();
        this.view.addChild(viewPortRect2)
    };
    this.view = new Phaser.Group(game, null);
}

function Screen() {
    this.initialize.apply(this, arguments);
}

Screen.prototype.initialize = function(game, cameraCount) {
    this.game = game;
    this.cameraCount = cameraCount;


    this.boxWidth =  this.cameraCount === 1 ? game.width : game.width/2;
    this.boxHeight =  this.cameraCount <= 2 ? game.height : game.height/2;
    this.cams = [];
    this.overlays = [];
    this.minimap = null;
    this.minimapOverlay = null;
    this.firstRender = true;
};


Screen.prototype.setCamera = function(idx, camworld, target, overlay)
{
    assert(idx < this.cameraCount, "not enough cameras");
    assert(this.firstRender, "can't change content if update was called");
    var x = idx % 2 ? this.game.width/2 : 0;
    var y = idx < 2 ? 0 : this.game.height /2;
    var cam = new Camera(this.game, this.boxWidth, this.boxHeight, new Phaser.Rectangle(x, y, this.boxWidth, this.boxHeight));

    cam.followObject(target);
    cam.setDisplayTarget(camworld.world);
    cam.bounds.width = camworld.width;
    cam.bounds.height = camworld.height;
    this.cams[idx] = cam;
    if(overlay){
        overlay.setPort(this.cams[idx].port);
        this.overlays[idx] = overlay;
    }
};

Screen.prototype.setMinimap = function (camworld, overlay)
{
    assert(this.firstRender, "can't change content if update was called");
    var camRatio = camworld.height/camworld.width;
    if(this.cameraCount === 3)
        this.minimap = new Camera(this.game, camworld.width, camworld.height, new Phaser.Rectangle(this.game.width*0.5, this.game.height*0.5, this.game.width*0.5, this.game.height*0.5)); //center camera
    else if(this.cameraCount === 4)
        this.minimap = new Camera(this.game, camworld.width, camworld.height, new Phaser.Rectangle(this.game.width*0.45, (this.game.height - this.game.width/10*camRatio)/2, this.game.width/10, this.game.width/10*camRatio)); //center camera
    else
        this.minimap = new Camera(this.game, camworld.width, camworld.height, new Phaser.Rectangle(this.game.width*0.45, this.game.height - this.game.width/10*camRatio, this.game.width/10, this.game.width/10*camRatio)); //center bottom camera

    this.minimap.setDisplayTarget(camworld.world);
    if(overlay)
    {
        overlay.setPort(this.minimap.port);
        this.minimapOverlay = overlay;
    }
};

Screen.prototype.update = function()
{
    if(this.firstRender)
    {
        this.firstRender = false;
        for(var idx = 0; idx < this.cameraCount; ++idx)
        {
            this.game.world.addChild(this.cams[idx].view);
            if(this.overlays[idx])
                this.game.world.addChild(this.overlays[idx].view);
        }
        if(this.minimap) {
            this.game.world.addChild(this.minimap.view);
            if(this.minimapOverlay)
                this.game.world.addChild(this.minimapOverlay.view);
        }
    }

    for(var i = 0; i < this.cameraCount; ++i)
      this.cams[i].render();
    if(this.minimap)
      this.minimap.render();
};
