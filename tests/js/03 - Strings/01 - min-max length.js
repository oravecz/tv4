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
describe( 'JsonSchema will verify a strings length and', function () {
    var js;

    beforeEach(function() {
        js = new JsonSchema();
    });

    it( 'will accept a string value with no length constraints', function () {
        var result = js.validate( 'test', {"type" : "string"} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept a string length greater than a minimum length constraint', function () {
        var result = js.validate( 'test', {type : 'string', minLength : 3} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept a string length the same as a minimum length constraint', function () {
        var result = js.validate( 'test', {type : 'string', minLength : 4} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject a string length greater than a maximum length constraint', function () {
        var result = js.validate( 'test', {type : 'string', maxLength : 3} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept a string length the same as a maximum length constraint', function () {
        var result = js.validate( 'test', {type : 'string', maxLength : 4} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept a string length less than a maximum length constraint', function () {
        var result = js.validate( 'test', {type : 'string', maxLength : 5} );
        expect( result.valid ).toBe( true );
    } );
} );
