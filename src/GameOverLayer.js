/**
 * Created by ggv on 13-12-12.
 */
var GameOverLayer = cc.Layer.extend({

    init: function () {

        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.Director.getInstance().getWinSize();
    },
    update: function (dt) {
        /*if (this._state == STATE_PLAYING) {
         this.checkIsCollide();
         this.removeInactiveUnit(dt);
         this.checkIsReborn();
         this.updateUI();
         this._movingBackground(dt);
         }*/
    }
});

var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
        layer.init();
    }
});