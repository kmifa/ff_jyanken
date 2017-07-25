var FFV = FFV || {};

/**
 * 音源を扱うクラス
 * @constructor
 * @param {string} music - 扱う音源
 */
FFV.SOUND = function(music){
    this.audio = new Audio();
    this.music = 'music/' + music;
    this.audio.src = this.music;
};

/**
 * 再生関数
 */
FFV.SOUND.prototype.play = function(){
    this.audio.play();
};

/**
 * 停止関数
 */
FFV.SOUND.prototype.pause = function(){
    this.audio.pause();
};

/**
 * 音量を扱う関数
 * @param {number} volume - 0~1の値
 */
FFV.SOUND.prototype.volume = function(volume){
    this.audio.volume = volume;
};