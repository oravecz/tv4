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
describe( 'JsonSchema will validate required properties on an instance and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will accept instance if required properties are found', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {required : ["key1", "key2"]};
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject instance if required properties are not found', function () {
        var data = {key1 : 1, key2 : 2, key3 : 3};
        var schema = {required : ["key1", "notDefined"]};
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will properly handle properties that evaluate to false (ie 0, false)', function () {
        var data = {key1 : 1, key2 : 0, key3 : false};
        var schema = {required : ["key1", "key2", "key3"]};
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will properly handle default properties that evaluate to false (ie 0, false)', function () {
        var schema = {
            type: 'object',
            properties: {
                key1: {
                    type: 'number',
                    'default': 0
                },
                key2: {
                    type: 'boolean',
                    'default': false
                },
                key3: {
                    type: 'string',
                    'default': ''
                }
            },
            required: ['key1', 'key2', 'key3']
        };
        var instance = js.generate( {}, schema );
        console.log( JSON.stringify( instance ) );
        var result = js.validate( instance, schema );
        expect( result.valid ).toBe( true );
    } );
} );
