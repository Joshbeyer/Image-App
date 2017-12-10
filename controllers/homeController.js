var Promise = require('bluebird');

module.exports = {
    get : function(query){
        return new Promise(function(resolve, reject){
            resolve('hey thar');
        });
    }
}