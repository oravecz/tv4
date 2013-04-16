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
describe( 'JsonSchema will validate an additionalItems schema value and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will accept additional array values with the same type as the additionalItems schema', function () {
        var data = [1, true, "one", "uno"];
        var schema = {
            "items": [
                {"type": "integer"},
                {"type": "boolean"}
            ],
            "additionalItems": {"type": "string"}
        };
        var result = js.validate(data, schema);
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject additional array values if not matching the additionalItems schema', function () {
        var data = [1, true, "one", 1];
        var schema = {
            "items": [
                {"type": "integer"},
                {"type": "boolean"}
            ],
            "additionalItems": {"type": "string"}
        };
        var result = js.validate(data, schema);
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept additional array values regardless of types if additionalItems schema is boolean true', function () {
        var data = [1, true, "one", "uno"];
        var schema = {
            "items": [
                {"type": "integer"},
                {"type": "boolean"}
            ],
            "additionalItems": {"type": "string"}
        };
        var result = js.validate(data, schema);
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject additional array values regardless of type if additionalItems schema is boolean false', function () {
        var data = [1, true, "one", "uno"];
        var schema = {
            "items": [
                {"type": "integer"},
                {"type": "boolean"}
            ],
            "additionalItems": false
        };
        var result = js.validate(data, schema);
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept array values that exactly match the number and types', function () {
        var data = [1, true];
        var schema = {
            "items": [
                {"type": "integer"},
                {"type": "boolean"}
            ],
            "additionalItems": false
        };
        var result = js.validate(data, schema);
        expect( result.valid ).toBe( true );
    } );

} );

