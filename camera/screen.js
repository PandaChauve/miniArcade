
function CameraWorld(world, width, height)
{
    this.world = world;
    this.width = width ? width : world.width;
    this.height = height ? height : world.height;
}

function Screen() {
    this.initialize.apply(this, arguments);
}

Screen.prototype.initialize = function(game, cameraCount, screenWidth, screenHeight) {
    this.width = screenWidth ? screenWidth : 1920;
    this.height = screenHeight ? screenHeight : 1080;
    this.game = game;
    this.cameraCount = cameraCount;
    this.cams = [];
    this.minimap = null;
};

Screen.prototype.createCamera = function(idx, camworld)
{
    var x = idx % 2 ? this.width/2 : 0;
    var y = idx < 2 ? 0 : this.height /2;
    var width =  this.cameraCount === 1 ? this.width : this.width/2;
    var height =  this.cameraCount <= 2 ? this.height : this.height/2;
    return new Camera(this.game, width, height, x, y, width, height);
};

Screen.prototype.setCamera = function(idx, camworld, target)
{
    this.cams[idx] = this.createCamera(idx, camworld);
    this.cams[idx].followObject(target);
    this.cams[idx].setDisplayTarget(camworld.world);
    this.game.world.addChild(this.cams[idx].view);
    this.cams[idx].bounds.width = camworld.width;
    this.cams[idx].bounds.height = camworld.height;
    if(this.minimap)
        this.game.world.bringToTop(this.minimap.view);
};

Screen.prototype.setMinimap = function (camworld)
{
    var camRatio = camworld.height/camworld.width;
    if(this.cameraCount === 3)
        this.minimap = new Camera(this.game, camworld.width, camworld.height, this.width*0.5, this.height*0.5, this.width*0.5, this.height*0.5); //center camera
    else if(this.cameraCount === 4)
        this.minimap = new Camera(this.game, camworld.width, camworld.height, this.width*0.45, (this.height - this.width/10*camRatio)/2, this.width/10, this.width/10*camRatio); //center camera
    else
        this.minimap = new Camera(this.game, camworld.width, camworld.height, this.width*0.45, this.height - this.width/10*camRatio, this.width/10, this.width/10*camRatio); //center bottom camera

    this.game.world.addChild(this.minimap.view);
    this.minimap.setDisplayTarget(camworld.world);
};

Screen.prototype.update = function()
{
  for(var i = 0; i < this.cameraCount; ++i)
      this.cams[i].render();
  if(this.minimap)
      this.minimap.render();
};