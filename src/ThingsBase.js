/**
 * Created by ggv on 13-11-22.
 */
var PTM_RATIO =40.0;
var ThingsBase = cc.Sprite.extend({
    _currentV:0,
    _Info:null,
    ctor:function (arg) {
        this._super();

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
        else if(this.collide(this,g_sharedGameLayer._theBoy)) {

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


            if(this._info.score == -1)
            {
                g_sharedGameLayer.gameOver();
            }
            g_sharedGameLayer._score +=this._info.score;
            g_sharedGameLayer._scoreLabel.setString("" + g_sharedGameLayer._score);

        }
    },
    destroy:function() {

    },
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 4, a.width, a.height / 2+20);
    },


    collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    },

});