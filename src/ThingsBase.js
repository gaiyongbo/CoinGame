/**
 * Created by ggv on 13-11-22.
 */
var PTM_RATIO =40.0;
var ThingsBase = cc.Sprite.extend({
    _currentV:0,
    _Info:null,
    ctor:function (arg) {
        this._super();
        this.setAnchorPoint(cc.p(0.5,0.5));
        this.scheduleUpdate();

    },
    update:function(dt) {

        var pos = this.getPosition();

        this._currentV += dt*4.8*PTM_RATIO;

        var y = pos.y  - this._currentV*dt;

        this.setPosition(cc.p(pos.x, y));

        var size = this.getContentSize();
        if((y + size.height/2) <=  0) {
            this.removeFromParent(true);
        }
        else if(this.collideWithBoy(g_sharedGameLayer._theBoy)) {

            if (g_sharedGameLayer._state == STATE_GAMEOVER) {
                return;
            }

            this.removeFromParent(true);

           /* if (g_sharedGameLayer.getChildByTag(100))
            {
                return;
            }

            var particle = cc.ParticleSystem.create(s_particle);

            particle.tag = 100;
            particle.setPosition(g_sharedGameLayer._theBoy.getPosition());
            g_sharedGameLayer.addChild(particle, 100);*/



            //加分


            if(this._info.type == 6)
            {
                //小孩变黑
                g_sharedGameLayer.boyBoomed();

                g_sharedGameLayer.gameOver();
            } else if(this._info.type == 7)
            {
                //减血
                g_sharedGameLayer._theBoy.life +=  this._info.score;
                g_sharedGameLayer._lifeLabel.setString("" + g_sharedGameLayer._theBoy.life);

                if(g_sharedGameLayer._theBoy.life <= 0) {
                    g_sharedGameLayer.gameOver();
                }
            }

            else
            {
                g_sharedGameLayer._score +=this._info.score;
                g_sharedGameLayer._scoreLabel.setString("" + g_sharedGameLayer._score);

            }

        }
    },
    destroy:function() {

    },
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2 + 30, p.y - a.height / 4, a.width - 30, a.height / 2+20);
    },


    collideWithBoy:function (b) {
        var pos1 = this.getPosition();
        var pos2 = b.getPosition();

        var aRect = this.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    }

});