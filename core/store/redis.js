const redis = require('redis'),
denodeify = require('promise').denodeify,
client = redis.createClient();

client.on("error", console.log);

module.exports = {
    hgetall: function(key) {
        return new Promise(function(resolve, reject){
            client.hgetall(key, function(err, value){
                if(err) {
                    return reject(err);
                }
                resolve(value);
            });
        })
    },
    
    hset: function(id, key, value) {
        return new Promise(function(resolve, reject){
            client.hset(id, key, value, function(err, res){
                if(err) {
                    return reject(err);
                }
                resolve(res);
            });
        })
    }, 

    hdel: function(id, key) {
        return new Promise(function(resolve, reject){
            client.hdel(id, key, function(err, res){
                if(err) {
                    return reject(err);
                }
                resolve(res);
            });
        })
    }
};