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
describe( 'JsonSchema will validate using scema references from within a schema and', function () {
    it( 'will validate against an inline schema fragment', function () {
        var schema = {
            "type": "array",
            "items": {"$ref": "#test"},
            "testSchema": {
                "id": "#test",
                "type": "boolean"
            }
        };
        var data = [true, false];
        var js = new JsonSchema();
        var result = js.validate(data, schema);
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an instance that does not match the inline schema fragment', function () {
        var schema = {
            "type": "array",
            "items": {"$ref": "#test"},
            "testSchema": {
                "id": "#test",
                "type": "boolean"
            }
        };
        var data = [true, 0];
        var js = new JsonSchema();
        var result = js.validate(data, schema);
        expect( result.valid ).not.toBe( true );
    } );

    it( '', function () {
        var examplePathBase = "http://example.com/" + Math.random();
        var examplePath = examplePathBase +"/schema";
        var schema = {
            "id": examplePath,
            "type": "array",
            "items": {"$ref": "other-schema"},
            "testSchema": {
                "id": "/other-schema",
                "type": "boolean"
            }
        };

        var js = new JsonSchema( examplePath, schema );

        var data = [0, false];
        var result = js.validate(data, examplePath);

        expect( result.missing.length ).toEqual( 1 );
        expect( result.isMissing( examplePathBase + "/other-schema" ) ).toBe( true );
        expect( result.valid ).toBe( true );
    } );
} );
