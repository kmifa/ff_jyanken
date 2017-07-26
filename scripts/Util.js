var kmifaLib = (function(){
    'use strict'

    /**
     * @param num
     * @returns {number} - 引数未満のランダム値を返す
     */
    var ranInRange = function(num){
        var r = Math.floor(Math.random() * num);
        return r;
    };

    return {
        ranInRange : ranInRange
    }

})();