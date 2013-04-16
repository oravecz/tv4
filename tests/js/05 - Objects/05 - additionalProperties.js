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
describe( 'JsonScema can use additionalProperties schema to apply schemas to dynamic properties and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will use additionalProperties to apply schemas to any props not covered by other property identifiers', function () {
        var data = {intKey : 1, intKey2 : 5, stringKey : "string"};
        var schema = {
            properties : {
                intKey : {"type" : "integer"}
            },
            patternProperties : {
                "^int" : {minimum : 0}
            },
            additionalProperties : {"type" : "string"}
        };
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject additionalProperties that do not match the applied schema', function () {
        var data = {intKey : 10, intKey2 : 5, stringKey : null};
        var schema = {
            properties : {
                intKey : {minimum : 5}
            },
            patternProperties : {
                "^int" : {"type" : "integer"}
            },
            additionalProperties : {"type" : "string"}
        };
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept additionalProperties of any schema when boolean true is used', function () {
        var data = {intKey : 10, intKey2 : 5, stringKey : null};
        var schema = {
            properties : {
                intKey : {minimum : 5}
            },
            patternProperties : {
                "^int" : {"type" : "integer"}
            },
            additionalProperties : true
        };
        var result = js.validate( data, schema );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject any additionalProperties when boolean false is used', function () {
        var data = {intKey : 10, intKey2 : 5, stringKey : null};
        var schema = {
            properties : {
                intKey : {minimum : 5}
            },
            patternProperties : {
                "^int" : {"type" : "integer"}
            },
            additionalProperties : false
        };
        var result = js.validate( data, schema );
        expect( result.valid ).not.toBe( true );
    } );
} );
