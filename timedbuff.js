(function(global) {
    var TimedBuff = function(expire_time) {
        if (!expire_time) {
            throw "Missing parameter expire time";
        }
        var _buff = [];
        var _timers = [];

        return {
            push: function(ts, value) {
                _buff.push(value);
                var tid = setTimeout(function() {
                     var idx = _buff.indexOf(value);
                    _buff.splice(idx, 1);
                    _timers.splice(idx, 1);
                }, expire_time - (Date.now() - ts));
                _timers.push(tid);
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
            },
            remove: function(value) {
                var idx = _buff.indexOf(value);
                _buff.splice(idx, 1);
                clearTimeout(_timers[idx]);
                _timers.splice(idx, 1);
            }
        }
    };

    global.TimedBuff = TimedBuff;
}(this));

