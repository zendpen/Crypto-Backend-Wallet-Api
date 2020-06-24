//user class

class UserClass {
    constructor(password, keys){
        this.phash = password;
        this.keys = keys;
    }

    show(){
        return this.phash;
    }

    get pass() {
        return this.phash;
    }
    set pass(x) {
        this.phash = x;
    }

    static from(json){
        return Object.assign(new UserClass(), json);
      }
}

module.exports = UserClass;