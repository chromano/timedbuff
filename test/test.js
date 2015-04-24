var assert = require("assert");
var timedbuff = require("../timedbuff.js");

describe("TimedBuff", function() {
    describe("Module", function() {
        it("should require the expire time in the constructor", function() {
            assert.throws(function() {
                return new timedbuff.TimedBuff();
            }, /missing/i);
            assert.doesNotThrow(function() {
                return new timedbuff.TimedBuff(1800);
            }, /missing/i);
        });

        it("should allow pushing and retrieving elements", function() {
            var tb = new timedbuff.TimedBuff(30 * 60 * 1000);
            tb.push(Date.now(), 1);
            tb.push(Date.now(), 2);
            assert.equal(tb.first(), 1);
            assert.equal(tb.last(), 2);
        });

        it("should remove expired elements automatically", function() {
            var tb = new timedbuff.TimedBuff(1);
            tb.push(Date.now(), 500);
            assert.equal(tb.length(), 1); 
            setTimeout(function() {
                assert.equal(tb.length(), 0); 
            }, 1000);
        });
    });
});
