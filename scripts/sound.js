var FFV = FFV || {};

// SOUNDコンストラクタ
FFV.SOUND = function(music){
    this.audio = new Audio();
    this.music = 'music/' + music;
    this.audio.src = this.music;
};

FFV.SOUND.prototype.play = function(){
    this.audio.play();
};

FFV.SOUND.prototype.pause = function(){
    this.audio.pause();
};

FFV.SOUND.prototype.volume = function(volume){
    this.audio.volume = volume;
};