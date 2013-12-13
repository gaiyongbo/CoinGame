/**
 * Created by ggv on 13-11-22.
 */

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
TAG_SCORE  = 1001;
var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({
    _state: null,
    isMouseDown: false,
    circle: null,
    _texTransparentBatch: null,
    _time: null,
    _levelManager: null,
    _theBoy:null,
    _winSize:null,
    _score:0,
    _scoreLabel:null,
    init: function () {

        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.Director.getInstance().getWinSize();

        this._winSize = size;

        // TransparentBatch

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_textureTransparentPack_plist);

        var texTransparent = cc.TextureCache.getInstance().addImage(s_gameObjects);
        this._texTransparentBatch = cc.SpriteBatchNode.createWithTexture(texTransparent);
        this.addChild(this._texTransparentBatch,1);
        //背景
        var bg = cc.Sprite.createWithSpriteFrameName("bg01.png");

        bg.setAnchorPoint(cc.p(0.5, 0.5));
        bg.setPosition(cc.p(size.width / 2, size.height / 2));
        bg.setScale(size.height/bg.getContentSize().height);

        this._texTransparentBatch.addChild(bg);

        //初始化接东西的小孩子

        this._theBoy = new Boy();
        this._texTransparentBatch.addChild(this._theBoy, this._theBoy.zOrder, 1);


        //初始化关卡管理器
        this._levelManager = new LevelManager(this);

        if (sys.capabilities.hasOwnProperty('keyboard'))
            this.setKeyboardEnabled(true);

        if (sys.capabilities.hasOwnProperty('mouse'))
        /*if ('mouse' in sys.capabilities)*/
            this.setMouseEnabled(true);

        if (sys.capabilities.hasOwnProperty('touches'))
        /*if ('touches' in sys.capabilities)*/
            this.setTouchEnabled(true);

        //分数
        var scoreLabel = cc.LabelTTF.create('分数:','Marker Felt');
        scoreLabel.setPosition(cc.p(30,size.height - 20));
        this.addChild(scoreLabel,2);

        this._scoreLabel = cc.LabelTTF.create('0','Marker Felt');
        this._scoreLabel.setPosition(cc.p(30 + 30,size.height - 20));
        this._scoreLabel.setTag(TAG_SCORE);
        this.addChild(this._scoreLabel,2);

        g_sharedGameLayer = this;

        this.scheduleUpdate();
        this.schedule(this.scoreCounter, 1);

        this._state = STATE_PLAYING;

    },
    update: function (dt) {
        /*if (this._state == STATE_PLAYING) {
         this.checkIsCollide();
         this.removeInactiveUnit(dt);
         this.checkIsReborn();
         this.updateUI();
         this._movingBackground(dt);
         }*/
    },
    scoreCounter: function () {
        if (this._state == STATE_PLAYING) {
            this._time++;
            this._levelManager.loadLevelResource(this._time);
        }
    },
    onTouchesMoved:function (touches, event) {
        this.processEvent(touches[0]);
    },

    onMouseDragged:function (event) {
        this.processEvent(event);
    },

    processEvent:function (event) {
        if (this._state == STATE_PLAYING) {
            var delta = event.getDelta();
            delta.y = 0;
            var curPos = this._theBoy.getPosition();
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.POINT_ZERO, cc.p(this._winSize.width, this._winSize.height));
            this._theBoy.setPosition(curPos);
        }
    },

    onKeyDown:function (e) {
        MW.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        MW.KEYS[e] = false;
    },
    gameOver:function() {

        this._state = STATE_GAMEOVER;

        //cc.Director.getInstance().pause();
        var layer = new GameOverLayer();
        layer.init();
        this.addChild(layer,3);
        //layer.setAnchorPoint(cc.p(0.5, 0.5));
        //layer.setPosition(cc.p(this._winSize.width / 2, this._winSize.height / 2));
        //layer.setScale(this._winSize.height/layer.getContentSize().height);


        this.pauseSchedulerAndActions();
        //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new MenuScene()));


    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});
