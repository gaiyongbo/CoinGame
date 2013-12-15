/**
 * Created by ggv on 13-12-12.
 */
var GameOverLayer = cc.Layer.extend({

    init: function () {

        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.Director.getInstance().getWinSize();

        //弹出框背景
        // TransparentBatch

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_gameObjects_plist);

        var texture = cc.TextureCache.getInstance().addImage(s_gameObjects);
        var texBatch = cc.SpriteBatchNode.createWithTexture(texture);
        this.addChild(texBatch,1);
        //背景
        var bg = cc.Sprite.createWithSpriteFrameName('弹出_03.png');

        bg.setAnchorPoint(cc.p(0.5, 0.5));
        bg.setPosition(perPt2realPt(cc.p(0.5,0.55)));

        texBatch.addChild(bg);

        //背景上的按钮

        //左按钮


        var insetRect = cc.RectMake(1,1,1, 1);
        var buttonImageNormal = cc.Scale9Sprite.createWithSpriteFrameName('空按钮.png',insetRect);
        var imageSize = buttonImageNormal.getContentSize();

        var label = cc.LabelTTF.create('返回', 'Marker Felt', 45);

        var leftButton = cc.ControlButton.create(label,buttonImageNormal);

        leftButton.setBackgroundSpriteForState(buttonImageNormal,cc.CONTROL_STATE_NORMAL);

        leftButton.setPreferredSize(imageSize);
        leftButton.setPosition(cc.p(225, 135));
        leftButton._addTargetWithActionForControlEvent(this, this.leftButtonPressed, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

        bg.addChild(leftButton, 10);

        //右按钮



        var buttonImageNormal2 = cc.Scale9Sprite.createWithSpriteFrameName('空按钮.png',insetRect);
        var imageSize2 = buttonImageNormal2.getContentSize();

        var label = cc.LabelTTF.create('重玩', 'Marker Felt', 45);

        var rightButton = cc.ControlButton.create(label,buttonImageNormal2);

        rightButton.setBackgroundSpriteForState(buttonImageNormal2,cc.CONTROL_STATE_NORMAL);

        rightButton.setPreferredSize(imageSize2);
        rightButton.setPosition(cc.p(606, 135));
        rightButton._addTargetWithActionForControlEvent(this, this.rightButtonPressed, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

        bg.addChild(rightButton, 10);

    },
    leftButtonPressed:function (pSender) {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new MenuScene()));


    },
    rightButtonPressed:function (pSender) {
        //load resources
        //var scene = cc.Scene.create();
        //scene.addChild(new GameLayer());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameScene()));


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