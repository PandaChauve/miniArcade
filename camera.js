var cameraId = 0;
function Camera(width, height, target, world, overlay)
{
    this.width = width;
    this.height = height;
    this.target = target;
    cameraId++;
    this.camId = cameraId;
    //Create the renderer
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { antialias: true, backgroundColor: 0xffffff});

    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);
    this.gameContainer = new PIXI.Container();
    this.overlayContainer = overlay;
    this.container = new PIXI.Container();
    this.container.addChild(this.gameContainer);
    if(this.overlayContainer)
        this.container.addChild(this.overlayContainer);
    if(world)
    {
        this.gameContainer.scale.set(width/world.width,height/world.height);
        this.target = null;//never target in minimap mode
    }
}

Camera.prototype.draw = function(world)
{
    for(var i = 0; i < world.data.length; ++i)
    {
        var obj = world.data[i];
        if(obj.changed || !obj.cam[this.camId])
        {

            if(!obj.cam[this.camId])
            {
                obj.cam[this.camId] = spriteCache.createSprite(obj.name);
            }
            if(obj.body)
                obj.cam[this.camId].position.set(obj.body.position[0], -obj.body.position[1]);
            else
                obj.cam[this.camId].position.set(obj.x, obj.y);
            obj.cam[this.camId].rotation = -obj.body.angle;
            this.gameContainer.addChild(obj.cam[this.camId]);
        }
    }

    if(this.target)
    {
        var leftMargin = this.width/2;
        var topMargin = this.height/2;
        var x = Math.max(Math.min(-this.target.body.position[0], -leftMargin), -world.width+leftMargin);
        var y = Math.max(Math.min(this.target.body.position[1], -topMargin), -world.height+topMargin);

        this.gameContainer.position.set(x+leftMargin,y+topMargin);
    }


    //Tell the `renderer` to `render` the `stage`
    this.renderer.render(this.container);
};