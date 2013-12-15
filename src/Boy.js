/**
 * Created by ggv on 13-11-22.
 */
var Boy = cc.Sprite.extend({
    zOrder:10,
    life:6,
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2 + 50, p.y - a.height / 1.6, a.width - 50, a.height / 2+20);
    },

    ctor:function () {
        this._super();

        //init life
        this.initWithSpriteFrameName("人_03.png");

        this.setTag(1);

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        this.setAnchorPoint(cc.p(0.5,0.5));
        this.setPosition(cc.p(winSize.width/2,230));
    }
});