/**
 * Created by ggv on 13-11-22.
 */

STATE_PLAYING = 0;
STATE_PAUSED = 1;
STATE_GAMEOVER = 2;
TAG_SCORE  = 1001;
TAG_LIFE = 1002;
var g_sharedGameLayer;

var perPt2realPt = function(pt) {
    var vPt = cc.Director.getInstance().getVisibleOrigin();
    var vSize = cc.Director.getInstance().getVisibleSize();
    return cc.PointMake(vPt.x + vSize.width*pt.x,vPt.y + vSize.height*pt.y);
};
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
    _lifeLabel:null,
    init: function () {

        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.Director.getInstance().getWinSize();

        this._winSize = size;

        // TransparentBatch

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_gameObjects_plist);

        var texTransparent = cc.TextureCache.getInstance().addImage(s_gameObjects);
        this._texTransparentBatch = cc.SpriteBatchNode.createWithTexture(texTransparent);
        this.addChild(this._texTransparentBatch,1);
        //背景
        var bg = cc.Sprite.create("bg.png");

        bg.setAnchorPoint(cc.p(0.5, 0.5));
        bg.setPosition(perPt2realPt(cc.p(0.5,0.5)));

        this.addChild(bg);

        //初始化接东西的小孩子

        this._theBoy = new Boy();
        this._texTransparentBatch.addChild(this._theBoy, this._theBoy.zOrder, 1);

        //葡萄藤
        var leaf = cc.Sprite.createWithSpriteFrameName('前景_01.png');

        var vPt = cc.Director.getInstance().getVisibleOrigin();

        leaf.setAnchorPoint(cc.p(0, 1));
        leaf.setPosition(perPt2realPt(cc.p(0,1)));
        this._texTransparentBatch.addChild(leaf,this._theBoy.zOrder + 2);

        // 酒桌
        var table = cc.Sprite.createWithSpriteFrameName('前景_02.png');

        var vPt = cc.Director.getInstance().getVisibleOrigin();

        table.setAnchorPoint(cc.p(0, 0));
        table.setPosition(perPt2realPt(cc.p(0,0)));
        this._texTransparentBatch.addChild(table);

       this.addButton();






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
        var vPt = cc.Director.getInstance().getVisibleOrigin();


        var scoreLabel = cc.LabelTTF.create('分数:','Marker Felt',35);
        scoreLabel.setPosition(cc.p(40 + vPt.x,vPt.y + size.height - 20));
        this.addChild(scoreLabel,2);

        this._scoreLabel = cc.LabelTTF.create('0','Marker Felt',35);
        this._scoreLabel.setPosition(cc.p(30 + 80 + vPt.x,vPt.y + size.height - 20));
        this._scoreLabel.setTag(TAG_SCORE);
        this.addChild(this._scoreLabel,2);

        //生命值显示
        var lifeLabel = cc.LabelTTF.create('生命:','Marker Felt',35);
        lifeLabel.setPosition(cc.p(40 + vPt.x + 200,vPt.y + size.height - 20));
        this.addChild(lifeLabel,2);

        this._lifeLabel = cc.LabelTTF.create(""+this._theBoy.life,'Marker Felt',35);
        this._lifeLabel.setPosition(cc.p(30 + 80 + 200+vPt.x,vPt.y + size.height - 20));
        this._lifeLabel.setTag(TAG_LIFE);
        this.addChild(this._lifeLabel,2);


        g_sharedGameLayer = this;

        this.scheduleUpdate();
        this.schedule(this.scoreCounter, 1);

        this._state = STATE_PLAYING;

    },
    addButton:function() {
        var insetRect = cc.RectMake(1,1,1, 1);
        var buttonImageNormal = cc.Scale9Sprite.createWithSpriteFrameName('暂倯按钮.png',insetRect);
        var imageSize = buttonImageNormal.getContentSize();

        var label = cc.LabelTTF.create('', 'Marker Felt',10);

        var pause = cc.ControlButton.create(label,buttonImageNormal);

        pause.setBackgroundSpriteForState(buttonImageNormal,cc.CONTROL_STATE_NORMAL);

        pause.setPreferredSize(imageSize);

        pause.setPosition(cc.p(this._winSize.width - 120,this._winSize.height - 110));
        pause._addTargetWithActionForControlEvent(this, this.pause, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

        this.addChild(pause, 5);

        var buttonImageNormal2 = cc.Scale9Sprite.createWithSpriteFrameName('退出按钮.png',insetRect);
        var imageSize2 = buttonImageNormal2.getContentSize();

        var label2 = cc.LabelTTF.create('', 'Marker Felt',10);
        var exit = cc.ControlButton.create(label2,buttonImageNormal2);

        exit.setBackgroundSpriteForState(buttonImageNormal2,cc.CONTROL_STATE_NORMAL);

        exit.setPreferredSize(imageSize2);
        exit.setPosition(cc.p(this._winSize.width - 120,this._winSize.height - 230));
        exit._addTargetWithActionForControlEvent(this, this.exit, cc.CONTROL_EVENT_TOUCH_UP_INSIDE);

        this.addChild(exit, 5);


        //menu
       /* var pauseButtonNormal = cc.Sprite.createWithSpriteFrameName('暂倯按钮.png');
        var pauseButtonSelected = cc.Sprite.createWithSpriteFrameName('暂倯按钮.png');
        var pauseButtonDisabled = cc.Sprite.createWithSpriteFrameName('暂倯按钮.png');

        var newPause = cc.MenuItemSprite.create(pauseButtonNormal, pauseButtonSelected, pauseButtonDisabled, function () {
            this.pause();
        }.bind(this));
        var menu = cc.Menu.create(newPause);
        //menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 1, 2);
        menu.setPosition(cc.p(this._winSize.width - 120,this._winSize.height - 60));*/


    },
    pause:function(){
        if(this._state == STATE_PAUSED){
            cc.Director.getInstance().resume();
            this._state = STATE_PLAYING;
        } else if(this._state == STATE_PLAYING){
            cc.Director.getInstance().pause();
            this._state = STATE_PAUSED;
        }else {

        }

    },
    exit:function(){
       if(this._state != STATE_GAMEOVER){

           if(this._state == STATE_PAUSED){
               cc.Director.getInstance().resume();
               this._state == STATE_PLAYING;
           }
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new MenuScene()));
        }



    },
    boyBoomed:function(){
        var blackBoy = cc.SpriteFrameCache.getInstance().getSpriteFrame('人黑_03.png');
        this._theBoy.setDisplayFrame(blackBoy);
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
