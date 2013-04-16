/*
 * Copyright (c) 2013, Pykl Studios <admin@pykl.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
describe( 'JsonSchema can use regular expressions to define property names and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will accept schema assignments using matching patternProperties', function () {
        var data = {intKey: 1, intKey2: 5};
        var schema = {
            properties: {
                intKey: {"type": "integer"}
            },
            patternProperties: {
                "^int": {minimum: 0}
            }
        };
        var result = js.validate(data, schema);
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject validation if schemas assigned using patternProperties are violated', function () {
        var data = {intKey: 1, intKey2: 5};
        var schema = {
            properties: {
                intKey: {"type": "integer"}
            },
            patternProperties: {
                "^int": {minimum: 3}
            }
        };
        var result = js.validate(data, schema);
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will reject validation if schemas assigned using patternProperties are violated', function () {
        var data = {intKey: 10, intKey2: "string value"};
        var schema = {
            properties: {
                intKey: {minimum: 5}
            },
            patternProperties: {
                "^int": {"type": "integer"}
            }
        };
        var result = js.validate(data, schema);
        expect( result.valid ).not.toBe( true );
    } );
} );

