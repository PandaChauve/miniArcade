
function SpriteCache(){
    this.data  ={};
    this.released = {};
}

SpriteCache.prototype.init = function(name)
{
    this.released[name] = [];
    this.data[name] = [];
};

SpriteCache.prototype.createSprite = function(name)
{
    if(this.released[name].length === 0)
    {
        var cat = new PIXI.Sprite(
            PIXI.loader.resources[name].texture
        );
        cat.name = name;
        cat.inUse = false;
        cat.anchor.set(0.5,0.5);
        this.data[name].push(cat);
        this.released[name].push(cat);
    }

    var ret = this.released[name].pop();
    ret.inUse = true;
    return ret;
};
SpriteCache.prototype.releaseSprite = function(sprite)
{
    sprite.inUse = false;
    this.released[sprite.name].push(sprite);
};