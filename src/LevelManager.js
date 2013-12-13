/**
 * Created by ggv on 13-11-22.
 */
var LevelManager = cc.Class.extend({
    _gameLayer:null,
    _currentTime:0,
    ctor:function (gameLayer) {
        if(!gameLayer){
            throw "gameLayer must be non-nil";
        }
        this._gameLayer = gameLayer;
    },
    loadLevelResource:function(deltaTime){

        this._currentTime += deltaTime;

        //var randNum = cc.rand();

        for(var i = 0; i < EnemyType.length; i ++) {
            this.addEnemyToGameLayer(EnemyType[i]);
        }
    },
    addEnemyToGameLayer:function(enemyType){

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();
        var enemy = new Enemy(enemyType);
        this._gameLayer._texTransparentBatch.addChild(enemy);

        var enemypos = cc.p( 80 + (winSize.width - 160) * Math.random(), winSize.height);
        var enemycs =  enemy.getContentSize();
        enemy.setPosition( enemypos );
    }
});