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
describe( 'JsonSchema will validate the number of properties on an instance and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will allow greater number of properties than specified by minProperties', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {minProperties : 2};
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will allow same number of properties than specified by minProperties', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {minProperties : 3};
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject less number of properties than specified by minProperties', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {minProperties : 4};
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will allow less number of properties than specified by maxProperties', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {maxProperties : 4};
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will allow same number of properties than specified by maxProperties', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {maxProperties : 3};
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject greater number of properties than specified by maxProperties', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {maxProperties : 2};
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );
} );
