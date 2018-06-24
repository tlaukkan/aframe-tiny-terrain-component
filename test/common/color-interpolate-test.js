// eslint-disable-next-line no-unused-vars
const assert = require('assert');

const colorInterpolate = require('../../src/color-interpolate').interpolate;
const rgb2hex = require('../../src/color-interpolate').r2h;
const hex2rgb = require('../../src/color-interpolate').h2r;

describe('color-interpolate', function() {
    it('should convert white hex to rgb', function() {
        const rgb = hex2rgb('#ffffff')
        assert.equal(255, rgb[0])
        assert.equal(255, rgb[1])
        assert.equal(255, rgb[2])
    })

    it('should convert black hex to rgb', function() {
        const rgb = hex2rgb('#000000')
        assert.equal(0, rgb[0])
        assert.equal(0, rgb[1])
        assert.equal(0, rgb[2])
    })

    it('should convert red hex to rgb', function() {
        const rgb = hex2rgb('#ff0000')
        assert.equal(255, rgb[0])
        assert.equal(0, rgb[1])
        assert.equal(0, rgb[2])
    })

    it('should convert green hex to rgb', function() {
        const rgb = hex2rgb('#00ff00')
        assert.equal(0, rgb[0])
        assert.equal(255, rgb[1])
        assert.equal(0, rgb[2])
    })

    it('should convert blue hex to rgb', function() {
        const rgb = hex2rgb('#0000ff')
        assert.equal(0, rgb[0])
        assert.equal(0, rgb[1])
        assert.equal(255, rgb[2])
    })

    it('should interpolate between black and white', function() {
        const c1 = hex2rgb('#000000');
        const c2 = hex2rgb('#ffffff');
        const result = colorInterpolate(c1, c2, 0.5);

        console.log(JSON.stringify(result));
        assert.equal(128, result[0]);
        assert.equal(128, result[1]);
        assert.equal(128, result[2]);
    })


})
