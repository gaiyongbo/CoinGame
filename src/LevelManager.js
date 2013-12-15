/**
 * Created by ggv on 13-11-22.
 */
var LevelManager = cc.Class.extend({
    _gameLayer:null,
    _currentTime:0,
    _smallCoinProp:0.5,
    _largerCoinProp:0.7,
    _enemyProp:1,
    ctor:function (gameLayer) {
        if(!gameLayer){
            throw "gameLayer must be non-nil";
        }
        this._gameLayer = gameLayer;
    },
    loadLevelResource:function(deltaTime){

        this._currentTime += deltaTime;
        this.addEnemyToGameLayer(this.thingsThisTime());
    },
    addEnemyToGameLayer:function(enemyType){

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();
        var enemy = new Enemy(enemyType);
        this._gameLayer._texTransparentBatch.addChild(enemy,g_sharedGameLayer._theBoy._zOrder + 1);

        var enemypos = cc.p(winSize.width * Math.random(), winSize.height);
        var enemycs =  enemy.getContentSize();
        enemy.setPosition( enemypos );
    },
    thingsThisTime:function(){
        var randNum = cc.rand()/cc.RAND_MAX;


        if(randNum < this._smallCoinProp)
        {
            //出小金币
            return this.randomPick(smallCoinsType);
        } else if (randNum>=this._smallCoinProp && randNum < this._largerCoinProp)
        {
            //出大金币
            return this.randomPick(biggerCoinType);
        } else {
            //出刀子
            return this.randomPick(badThings);
        }
    },
    randomPick:function(things){
        var randNum = cc.rand()/cc.RAND_MAX;
        randNum = randNum*things.length;
        return things[parseInt(randNum)];
    }

});