"use strict";
/**
 * Created by Jacek on 22-01-2017.
 */
var Guser = (function () {
    function Guser(id, lo, fi, la, de, ex, lv) {
        this.id = id;
        this.login = lo;
        this.firstName = fi;
        this.lastName = la;
        this.description = de;
        this.exp = ex;
        this.lvl = lv;
    }
    return Guser;
}());
exports.Guser = Guser;
//# sourceMappingURL=guser.js.map