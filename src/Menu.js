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

             cc.SpriteFrameCache.getInstance().addSpriteFrames(s_textureTransparentPack_plist);

             var texTransparent = cc.TextureCache.getInstance().addImage(s_gameObjects);
             this._texTransparentBatch = cc.SpriteBatchNode.createWithTexture(texTransparent);
             this.addChild(this._texTransparentBatch,1);

            var bg = cc.Sprite.createWithSpriteFrameName("bg01.png");

            bg.setAnchorPoint(cc.p(0.5, 0.5));

            bg.setPosition(perPt2realPt(cc.p(0.5,0.5)));

            this._texTransparentBatch.addChild(bg);

            //add button

            var newGameNormal = cc.Sprite.create(s_menu, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(s_menu, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(s_menu, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(s_menu, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(s_menu, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(s_menu, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(s_menu, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(s_menu, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(s_menu, cc.rect(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, this.onNewGame,this);

            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(size.width / 2, size.height / 2 - 80);
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