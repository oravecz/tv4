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
describe( 'JsonSchema will verify enumerations', function () {

    var js;

    beforeEach(function() {
        js = new JsonSchema();
    });

    it( 'can verify an integer', function () {
        var schema = {"enum": [1]};
        var result = js.validate( 1, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an integer enum, but a string instance', function () {
        var schema = {"enum": [1]};
        var result = js.validate( "1", schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept an empty object enum', function () {
        var result = js.validate( {}, {"enum": [{}]} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an empty object with a populated object enum', function () {
        var result = js.validate( {}, {"enum": [{"key": "value"}]} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept a mixed array of values in an enum', function () {
        var result = js.validate( [1, true, 0], {"enum": [[1, true, 0], 5, {}]} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an array enum if it has more elements than schema', function () {
        var result = js.validate( [1, true, 0, 5], {"enum": [[1, true, 0], 5, {}]} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will reject an array enum if the elements are not in same order', function () {
        var result = js.validate( [1, 0, true], {"enum": [[1, true, 0], 5, {}]} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will reject an array if the elements do not have the same value as enum', function () {
        var result = js.validate( [1, true, 5], {"enum": [[1, true, 0], 5, {}]} );
        expect( result.valid ).not.toBe( true );
    } );
} );
