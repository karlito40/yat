const cookie = require('cookie')
, uniqid = require('uniqid');

class Session {

    constructor(SessionStore, req, res) {
        this.req = req;
        this.res = res;
        this.values = {};
        this.cookies = cookie.parse(this.req.headers.cookie || '');
        this.initSid();
        this.sessionStore = new SessionStore(this.sid);
    }

    restore() {
        return this.sessionStore.restore()
            .then((values) => {
                for(var i in values) {
                    this.values = JSON.parse(values[i]);
                }
            });
    }

    initSid(){
        this.sid = this.cookies['yat.sid'];
        if(!this.sid) {
            this.sid = uniqid();
            this.res.setHeader('Set-Cookie', cookie.serialize('yat.sid', this.sid, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7
            }));
        }
        console.log('this.sid', this.sid);
    }

    set(key, value) {
        this.values[key] = value;
        if(typeof value == 'object') {
            value = JSON.stringify(value);
        } 
        return this.sessionStore.set(key, value);
    }

    get(key) {
        return this.values[key];
    }

    del(key) {
        delete this.values[key];
        return this.sessionStore.del(key);
    }

    
    
}

module.exports = Session;