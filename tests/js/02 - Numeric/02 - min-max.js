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
describe( 'JsonSchema will validate min/max values and', function () {
    var js;

    beforeEach(function() {
        js = new JsonSchema();
    });

    it( 'will accept an instance number is greater than a minimum value', function () {
        var result = js.validate( 5, {minimum : 2.5} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an instance number that is equal to the minimum value', function () {
        var result = js.validate( 5, {minimum : 5} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an instance number that is less than the minimum value', function () {
        var result = js.validate( 5, {minimum : 6} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept an instance number is greater than an exclusive minimum value', function () {
        var result = js.validate( 5, {minimum : 2.5, exclusiveMinimum: true} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an instance number that is equal to an exclusive minimum value', function () {
        var result = js.validate( 5, {minimum : 5, exclusiveMinimum: true} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will reject an instance number that is less than an exclusive minimum value', function () {
        var result = js.validate( 5, {minimum : 6, exclusiveMinimum: true} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept an instance number is greater than a maximum value', function () {
        var result = js.validate( 2.5, {maximum : 5} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an instance number that is equal to the maximum value', function () {
        var result = js.validate( 5, {maximum : 5} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an instance number that is less than the maximum value', function () {
        var result = js.validate( 7, {maximum : 5} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept an instance number is greater than an exclusive maximum value', function () {
        var result = js.validate( 3, {maximum : 5, exclusiveMaximum: true} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an instance number that is equal to an exclusive maximum value', function () {
        var result = js.validate( 5, {maximum : 5, exclusiveMaximum: true} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will reject an instance number that is less than an exclusive maximum value', function () {
        var result = js.validate( 7, {maximum : 5, exclusiveMaximum: true} );
        expect( result.valid ).not.toBe( true );
    } );
} );

