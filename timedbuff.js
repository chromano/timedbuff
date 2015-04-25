(function(global) {
    var TimedBuff = function(expire_time) {
        if (!expire_time) {
            throw "Missing parameter expire time";
        }
        var _buff = [];
        var _timers = [];
        var _oldest = null;
        var _newest = null;

        return {
            push: function(ts, value) {
                if (_oldest == null || ts < _oldest) {
                    _oldest = value;
                }
                if (_newest == null || ts > _newest) {
                    _newest = value;
                }
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
            oldest: function() {
                return _oldest;
            },
            newest: function() {
                return _newest;
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

