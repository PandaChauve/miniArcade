
function BaseOverlay(game) //overlay should be null (it's here to display the interface), but it will work if not used as the base one
{
    this.game = game;
    this.getView = function(port)
    {
        var ret = new Phaser.Group(game, null);
        ret.x = port.x;
        ret.y = port.y;
        return ret;
    }
}
function BoxOverlay(baseOverlay, color)
{
    this.color = color;
    this.baseOverlay = baseOverlay;
    this.getView = function(port)
    {
        var ret = this.baseOverlay.getView(port);

        var viewPortRect2 = new Phaser.Graphics(this.baseOverlay.game);
        viewPortRect2.beginFill(color, 0);
        viewPortRect2.lineStyle(1, color);
        viewPortRect2.drawRect(0, 0, port.width-1, port.height-1);
        viewPortRect2.endFill();
        ret.addChild(viewPortRect2);
        return ret;
    };
}