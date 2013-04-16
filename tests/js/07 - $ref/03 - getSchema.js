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
describe( 'JsonSchema manages schema files and references', function () {

    it( 'will add schemas in the constructor and fetch them back', function () {
        var url = "http://example.com/schema" + Math.random();
        var schema = {
            "test" : "value"
        };
        var js = new JsonSchema( url, schema );
        var xSchema = js.getSchema( url );
        expect( xSchema ).toBeDefined();
        expect( js.getSchema( url ) ).toBe( schema );
    } );

    xit( 'will use the schema\'s id as a uri if not specified directly', function () {
        var url = "http://example.com/schema" + Math.random();
        var schema = {
            "id": url,
            "test" : "value"
        };
        var js = new JsonSchema( schema );
        var xSchema = js.getSchema( url );
        expect( xSchema ).toBeDefined();
        expect( js.getSchema( url ) ).toBe( schema );
    } );

    it( 'will handle schema uris with blank fragments', function () {
        var url = "http://example.com/schema" + Math.random();
        var schema = {
            "test": "value"
        };
        var js = new JsonSchema( url, schema );
        var xSchema = js.getSchema( url + '#');
        expect( xSchema ).toBeDefined();
        expect( xSchema.test ).toBe( 'value' );
    } );

    it( 'will handle schema uris with json pointers', function () {
        var url = "http://example.com/schema" + Math.random();
        var schema = {
            "items": {
                "properties": {
                    "key[]": {
                        "inner/key~": "value"
                    }
                }
            }
        };
        var js = new JsonSchema( url, schema );
        var xSchema = js.getSchema( url + '#/items/properties/key%5B%5D/inner~1key~0');
        expect( xSchema ).toBe( 'value' );
    } );
} );
