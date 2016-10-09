const Redis = require('../store/redis');

class RedisStore {
    
    constructor(sid) {
        this.sid = sid;
    }
    
    restore() {
        return Redis.hgetall(this.sid);
    }

    set(key, value) {
        return Redis.hset(this.sid, key, value);
    }

    del(key) {
        return Redis.hdel(this.sid, key);
    }
}

module.exports = RedisStore;