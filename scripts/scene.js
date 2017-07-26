var FFV = FFV || {};

/**
 * 初期シーン
 * @constructor
 * @param {number} [hash] - デバッグ用
 */
FFV.SCENE = function(hash){
    this.First = $("#start-scene");
    this.tit = $(".title").find("h1");
    this.tit_re = $(".title-reverse").find("p");
    this.enterBtn = $(".start-menu").find("p");
    this.sirudora = $(".sirudora");
    this.titHeight = 98;

    this.soundPrelude = "";
    this.soundBattleStart = "";

    if(hash === 2){
        var battle = new FFV.BATTLE();
    }else if(hash === 3){
        var finish = new FFV.FINISH();
    }else{
        this.initialize();
        this.showView();
    }
};

/**
 * cssの初期化
 */
FFV.SCENE.prototype.initialize = function(){
    this.First.css("opacity",0);
    this.sirudora.css("opacity",0);
    this.enterBtn.css("opacity",0);
    this.tit.css("top",this.titHeight);
    this.tit_re.css("top",-this.titHeight);
};

/**
 * 画面アニメーション
 */
FFV.SCENE.prototype.showView = function(){

    var self = this;
    var d = new $.Deferred();
    this.soundPrelude = new FFV.SOUND('prelude.mp3');
    this.soundPrelude.play();

    this.First.fadeTo(1000,1,function(){
        d.resolve();
    });

    d.promise()
        .then(function(){

            var d2 = new $.Deferred();

            self.tit.animate({
                top : 0
            },3000,function(){
               d2.resolve();
            });

            self.tit_re.animate({
                top : 0
            },3000);

            return d2.promise();
        })
        .then(function(){

            var d3 = new $.Deferred();

            self.sirudora.fadeTo(3000,1,function(){
                d3.resolve();
            });

            return d3.promise();
        })
        .then(function(){
           self.enterBtn.fadeTo(3000,1,function(){
               self.hideView();
           });
        });
};

/**
 * Startを押した時のclickイベント
 */
FFV.SCENE.prototype.hideView = function(){

    var self = this;

    this.enterBtn.one("click",function(){
        self.toBattle();
    });

};

/**
 * 画面遷移する関数
 */
FFV.SCENE.prototype.toBattle = function(){
    this.soundBattleStart = new FFV.SOUND('battle-start.wav');
    var self = this;
    var BATTLE;
    var count = 1;
    var func = function(){
        self.soundPrelude.volume(count);
        count -= 0.1;
        if(count < 0){
            TIME.stopInterval();
            self.soundPrelude.pause();
            self.soundBattleStart.play();

            setTimeout(function(){
                BATTLE = new FFV.BATTLE();
            },1800);
        }
    };
    var TIME = new FFV.TIMER(300,func);

    TIME.useInterval();
    self.First.fadeOut(3000);
};

/**
 * バトルシーン
 * @constructor
 */
FFV.BATTLE = function(){

    this.textArea = $(".text-voice");
    this.command = $(".command");
    this.hand = this.command.find("p");
    this.second = $("#battle-scene");
    this.enemy = $("#img-enemy");
    this.enemy_out = -220;
    this.enemy_in = 120;

    this.yourLife = 3;
    this.enemyLife = 3;

    this.yourHP = $(".st-friend").find("span");
    this.enemyHP = $(".st-enemy").find("span");

    this.soundBattle = "";

    this.initialize();
    this.showView();
};

/**
 * cssの初期化
 */
FFV.BATTLE.prototype.initialize = function(){
    this.enemy.css("left",this.enemy_out);
    this.command.hide();
    this.textArea.hide();
    this.yourHP.text(this.yourLife);
    this.enemyHP.text(this.enemyLife);
};

/**
 * 画面アニメーション
 */
FFV.BATTLE.prototype.showView = function(){
    var self = this;
    var d = new $.Deferred();
    this.soundBattle = new FFV.SOUND('big.mp3');
    this.soundBattle.volume(1);
    this.soundBattle.play();

    this.second.delay(2500).fadeIn(800);

    this.enemy.delay(3000).animate({
        left : this.enemy_in
    },100,function(){
        d.resolve();
    });

    d.promise()
        .then(function(){
            self.command.show();
            self.onClickCommand();
        });
};

/**
 * プレイヤーのコマンドをクリックした時
 */
FFV.BATTLE.prototype.onClickCommand = function(){
    var self = this;

    this.hand.on("click",function(){
        var hisHand = kmifaLib.ranInRange(3);
        console.log(hisHand);

        if(hisHand === 0){
            self.drawEvent();
        }else if(hisHand === 1){
            self.loseEvent();
        }else if(hisHand === 2){
            self.winEvent();
        }
    });
};

/**
 * あいこの時に実効する関数
 */
FFV.BATTLE.prototype.drawEvent = function(){

};

/**
 * 勝った時に実行する関数
 */
FFV.BATTLE.prototype.winEvent = function(){
    this.enemyLife -= 1;
    this.enemyHP.text(this.enemyLife);
    var self = this;
    var count = 1;
    var FINISH;
    var func = function(){
        self.soundBattle.volume(count);
        count -= 0.1;

        if(count < 0){
            self.soundBattle.pause();
            TIMER.stopInterval();
            FINISH = new FFV.FINISH();
        }
    };
    var TIMER = new FFV.TIMER(100,func);

    if(this.enemyLife === 0){
        this.command.hide();

        this.textArea.show();
        this.textArea.text("「バッツ、お前の勝ちだ！」");

        setTimeout(function(){
            self.textArea.hide();
        },3000);

        this.enemy.delay(3000).fadeOut(5000,function(){
            TIMER.useInterval();
        });
    }
};

/**
 * 負けた時に実行する関数
 */
FFV.BATTLE.prototype.loseEvent = function(){
    var self = this;
    this.yourLife -= 1;
    this.yourHP.text(this.yourLife);
    if(this.yourLife === 0){

    }
};

/**
 * 関数
 * @returns {number} - 0~2の値を返す
 */
FFV.BATTLE.prototype.randomReturn = function(){
    var random = Math.floor(Math.random()* 3);
    return random;
};

/**
 * 勝った時のシーン
 * @constructor
 */
FFV.FINISH = function(){

    this.second = $("#battle-scene");
    this.finish = $("#finish-scene");
    this.backGround = $("#battle-background");
    this.textArea = $(".text-voice");
    this.soundFinish = "";
    this.initialize();
    this.showView();
};

/**
 * cssの初期化
 */
FFV.FINISH.prototype.initialize = function(){
    this.finish.hide();
};

/**
 * 画面アニメーション
 */
FFV.FINISH.prototype.showView = function(){
    var self = this;
    var d = new $.Deferred();
    this.soundFinish = new FFV.SOUND('finish.mp3');
    this.soundFinish.play();

    this.textArea.show();
    this.textArea.text("勝負に勝った");

    setTimeout(function(){
        d.resolve();
    },4000);

    d.promise()
        .then(function(){
            self.second.fadeOut(6000,function(){
                self.backGround.remove();
                self.finish.fadeIn(4000);
            });
        });
};

$(function(){
    var AppInit = new FFV.SCENE(1);
});