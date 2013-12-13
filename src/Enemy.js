/**
 * Created by ggv on 13-11-22.
 */
var Enemy = ThingsBase.extend({

    ctor:function (arg) {
        this._super();
        this._info = arg;
        this.initWithSpriteFrameName(arg.textureName);

    },
    destroy:function() {

    }
});