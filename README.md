TimedBuff
=========

Simple Javascript module to keep a list (a buffer) of data that should expire
in a given interval.

For example, let's say you have a stream of calls going to your application,
but for statistics' sake, you only want to keep the calls that happened in the
last 30 minutes, then you could have something like this:

    var tb = new TimedBuff(30 * 60 * 1000); // Yes, expire time is given in ms
    stream.on("call_received", function(call) {
        tb.push(Date.now(), call);
    });

Then if you want to get the list of calls that happened in the 30 minutes:

    tb.content();  // returns an array with the elements pushed
