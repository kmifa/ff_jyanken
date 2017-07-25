var FFV = FFV || {};

/**
 * setInterval扱うクラス
 * @param {number} interval - Intervalの指定
 * @param {function} cb - setInterval内で実行するコールバック関数
 * @constructor
 */
FFV.TIMER = function(interval,cb){
    this.timer = undefined;
    this.interval = interval;
    this.cbFunc = cb;
};

/**
 * setIntervalを扱う関数
 */
FFV.TIMER.prototype.useInterval = function(){
    var self = this;

    this.timer = setInterval(function(){
        self.cbFunc();
    },this.interval);
};

/**
 * setIntervalを停止する関数
 */
FFV.TIMER.prototype.stopInterval = function(){
  clearInterval(this.timer);
};