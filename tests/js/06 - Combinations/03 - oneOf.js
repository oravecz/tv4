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
describe( 'JsonSchema will validate an instance against multiple schemas and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will accept an instance if one (and only one) schema matches', function () {
        var data = 5;
        var schema = {
            "oneOf" : [
                {"type" : "integer"},
                {"type" : "string"},
                {"type" : "string", minLength : 1}
            ]
        };
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an instance if more than one schema matches', function () {
        var data = "string";
        var schema = {
            "oneOf" : [
                {"type" : "integer"},
                {"type" : "string"},
                {"minLength" : 1}
            ]
        };
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will reject an instance if no schema (in a oneOf) matches', function () {
        var data = false;
        var schema = {
            "oneOf" : [
                {"type" : "integer"},
                {"type" : "string"},
                {"type" : "string", "minLength" : 1}
            ]
        };
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );
} );
