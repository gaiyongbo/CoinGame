/**
 * Created by ggv on 13-11-22.
 */
var Boy = cc.Sprite.extend({
    zOrder:3000,
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 4, a.width, a.height / 2+20);
    },

    ctor:function () {
        this._super();

        //init life
        this.initWithSpriteFrameName("ship01.png");

        this.setTag(1);

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        this.setPosition(cc.p(winSize.width/2,40));

        // set frame
        var frame0 = cc.SpriteFrameCache.getInstance().getSpriteFrame("ship01.png");
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("ship02.png");

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);

        // ship animate
        var animation = cc.Animation.create(animFrames, 0.1);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.RepeatForever.create(animate));
    },
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 4, a.width, a.height / 2+20);
    },
});