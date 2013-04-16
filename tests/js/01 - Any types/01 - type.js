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
describe( 'JsonSchema supports all of the core JS types and', function () {

    it( 'can validate an empty schema', function () {
        var data = {};
        var schema = {};
        var result = new JsonSchema().validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'schema can verify the instance is an object', function () {
        var data = {};
        var schema = {"type" : "object"};
        var result = new JsonSchema().validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'schema can specify multiple types per property', function () {
        var schema = {"type": ["object", "string"]};
        var js = new JsonSchema();
        var result = js.validate( {}, schema );
        expect( result.valid ).toBe( true );

        result = js.validate( [], schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'schema can specify multiple types per property', function () {
        var data = {};
        var schema = {"type": ["object", "string"]};
        var result = new JsonSchema().validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'schema can verify types with arrays', function () {
        var data = [];
        var schema = {"type": ["object", "string"]};
        var result = new JsonSchema().validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'schema can verify type is an array', function () {
        var data = {};
        var schema = {"type": ["array"]};
        var result = new JsonSchema().validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'schema can verify type is a string', function () {
        var schema = {"type": ["string"]};
        var js = new JsonSchema();
        var result = js.validate( 5, schema );
        expect( result.valid ).not.toBe( true );

        result = js.validate( '5', schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'schema can verify null instance data is not an object', function () {
        var schema = {"type": ["object"]};
        var js = new JsonSchema();
        var result = js.validate( null, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'schema can verify null instance data correctly', function () {
        var schema = {"type": "null"};
        var js = new JsonSchema();
        var result = js.validate( null, schema );
        expect( result.valid ).toBe( true );
    } );
} );

