var controllerCount = 0;
function Controller()
{
  this.id = controllerCount;

    controllerCount++;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    var that = this;
    if(this.id === 0)
    {
        keyboardJS.bind('z', function(e) {
            that.up = true;
        },function(e) {
            that.up = false;
        });
        keyboardJS.bind('q', function(e) {
            that.left = true;
        },function(e) {
            that.left = false;
        });
        keyboardJS.bind('s', function(e) {
            that.down = true;
        },function(e) {
            that.down = false;
        });
        keyboardJS.bind('d', function(e) {
            that.right = true;
        },function(e) {
            that.right = false;
        });
    }
    else
    {
        keyboardJS.bind('up', function(e) {
            that.up = true;
        },function(e) {
            that.up = false;
        });
        keyboardJS.bind('left', function(e) {
            that.left = true;
        },function(e) {
            that.left = false;
        });
        keyboardJS.bind('down', function(e) {
            that.down = true;
        },function(e) {
            that.down = false;
        });
        keyboardJS.bind('right', function(e) {
            that.right = true;
        },function(e) {
            that.right = false;
        });
    }
}