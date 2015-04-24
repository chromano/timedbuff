(function(global) {
    var TimedBuff = function(expire_time) {
        if (!expire_time) {
            throw "Missing parameter expire time";
        }
        var _buff = [];

        return {
            push: function(ts, value) {
                var l = _buff.push(value);
                setTimeout(function() {
                    _buff.splice(l - 1, 1);
                }, expire_time - (Date.now() - ts));
            },
            content: function() {
                return _buff.slice(0);
            },
            first: function() {
                if (_buff.length) {
                    return _buff[0];
                }
            },
            last: function() {
                if (_buff.length) {
                    return _buff[_buff.length - 1];
                }
            },
            length: function() {
                return _buff.length;
            }
        }
    };

    global.TimedBuff = TimedBuff;
}(this));

