var FFV = FFV || {};

// TIMERコンストラクタ
FFV.TIMER = function(interval,cb){
    this.timer = undefined;
    this.interval = interval;
    this.cbFunc = cb;
};

FFV.TIMER.prototype.useInterval = function(){
    var self = this;

    this.timer = setInterval(function(){
        self.cbFunc();
    },this.interval);
};

FFV.TIMER.prototype.stopInterval = function(){
  clearInterval(this.timer);
};