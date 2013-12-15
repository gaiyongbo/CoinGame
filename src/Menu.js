/**
 * Created by ggv on 13-11-24.
 */
var Menu = cc.Layer.extend({
    _texTransparentBatch: null,
    _playButton:null,
    _rankButton:null,
    _nameLabel:null,
    _scoreLabel:null,
    init:function () {
        if (this._super()){
            var size = cc.Director.getInstance().getWinSize();
            //背景


             cc.SpriteFrameCache.getInstance().addSpriteFrames(s_gameObjects_plist);

             var texTransparent = cc.TextureCache.getInstance().addImage(s_gameObjects);
             this._texTransparentBatch = cc.SpriteBatchNode.createWithTexture(texTransparent);
             this.addChild(this._texTransparentBatch,1);

            var bg = cc.Sprite.create("bg.png");

            bg.setAnchorPoint(cc.p(0.5, 0.5));

            bg.setPosition(perPt2realPt(cc.p(0.5,0.5)));

            this.addChild(bg);

            //游戏名字
            var name = cc.Sprite.createWithSpriteFrameName("接金币字_03.png");

            name.setAnchorPoint(cc.p(0.5, 0.5));

            name.setPosition(perPt2realPt(cc.p(0.5,0.7)));

            this._texTransparentBatch.addChild(name);

            //add button

           // var begin = cc.Sprite.createWithSpriteFrameName('开始按钮.png');



            //var tmp = cc.Sprite.create('开始按钮.png');
            //var orgSize = tmp.getContentSize();
           // var fullRect = cc.RectMake(0,0, orgSize.width, orgSize.height);
            var insetRect = cc.RectMake(1,1,1, 1);

            var buttonImageNormal = cc.Scale9Sprite.createWithSpriteFrameName('开始按钮.png',insetRect);
            var imageSize = buttonImageNormal.getContentSize();

            var label = cc.LabelTTF.create('', 'Marker Felt',10);

            var newGameButton = cc.ControlButton.create(label,buttonImageNormal);

            newGameButton.setBackgroundSpriteForState(buttonImageNormal,cc.CONTROL_STATE_NORMAL);

            newGameButton.setPreferredSize(imageSize);
            newGameButton.setAnchorPoint(cc.p(0.5,0.5));
            newGameButton.setPosition(cc.p(size.width/2-10, size.height/2 - 50));
            newGameButton._addTargetWithActionForControlEvent(this, this.onNewGame, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

            this.addChild(newGameButton, 10);




        }
    },
    onNewGame:function (pSender) {
        //load resources
        //var scene = cc.Scene.create();
        //scene.addChild(new GameLayer());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameScene()));


    },
    onSettings:function (pSender) {

    },
    onAbout:function (pSender) {
    }

    });

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Menu();
        this.addChild(layer);
        layer.init();
    }
});