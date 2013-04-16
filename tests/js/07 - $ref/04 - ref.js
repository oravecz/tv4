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
describe( 'JsonSchema will resolve schema references and', function () {

    it( 'will validate against an external schema', function () {
        var url = "http://example.com/schema" + Math.random();
        var schema = {
            "test" : "value"
        };

        var js = new JsonSchema( url, schema );

        var otherSchema = {
            "items" : {"$ref" : url}
        };

        var result = js.validate( [0, 1, 2, 3], otherSchema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will validate a a self-referencing nested schema', function () {
        var schema = {
            "type" : "array",
            "items" : {"$ref" : "#"}
        };

        var js = new JsonSchema();

        var result = js.validate( [ [], [ [] ] ], schema );
        expect( result.valid ).toBe( true );

        result = js.validate( [0, 1, 2, 3], schema );
        expect( result.valid ).not.toBe( true );

        result = js.validate( [
            [true],
            []
        ], schema );
        expect( result.valid ).not.toBe( true );
    } );
} );
