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
describe( 'JsonSchema can normalize a schema and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will ensure immediate reference fragments are untouched', function () {
        var schema = {
            "items" : {"$ref" : "#"}
        };
        js.normSchema( schema );
        expect( schema.items['$ref'] ).toBe( "#" );
    } );

    it( 'will resolve reference fragments relative to base uri', function () {
        var schema = {
            "id" : "baseUrl",
            "items" : {"$ref" : "#"}
        };
        js.normSchema( schema );
        expect( schema.items['$ref'] ).toBe( "baseUrl#" );
    } );

    it( 'will resolve reference fragments relative to base uri', function () {
        var schema = {
            "id" : "http://example.com/schema",
            "items" : {
                "id" : "otherSchema",
                "items" : {
                    "$ref" : "#"
                }
            }
        };
        js.normSchema( schema );
        expect( schema.items.id ).toBe( "http://example.com/otherSchema" );
        expect( schema.items.items['$ref'] ).toBe( "http://example.com/otherSchema#" );
    } );

    it( 'will not mess with enumerations while resolving references', function () {
        var schema = {
            "id" : "http://example.com/schema",
            "items" : {
                "id" : "otherSchema",
                "enum" : [
                    {
                        "$ref" : "#"
                    }
                ]
            }
        };
        js.normSchema( schema );
        expect( schema.items['enum'][0]['$ref'] ).toBe( "#" );
    } );

    it( 'will only resolve references when id and $ref values are strings', function () {
        var schema = {
            "properties" : {
                "id" : {"type" : "integer"},
                "$ref" : {"type" : "integer"}
            }
        };
        var data = {"id" : "test", "$ref" : "test"};
        js.normSchema( schema );
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

} );
