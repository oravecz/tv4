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
describe( 'JsonSchema will validate the min/max number of elements in an array and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    it( 'will accept any length array when no schema is specified', function () {
        var result = js.validate( [1, 2, 3], { type : 'array'} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an array with more elements than schema minItems', function () {
        var result = js.validate( [1, 2, 3], { type : 'array', minItems : 2} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an array with same number of elements than schema minItems', function () {
        var result = js.validate( [1, 2, 3], { type : 'array', minItems : 3} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an array with less number of elements than schema minItems', function () {
        var result = js.validate( [1, 2, 3], { type : 'array', minItems : 4} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept an array with less number of elements than schema maxItems', function () {
        var result = js.validate( [1, 2, 3], { type : 'array', maxItems : 4} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will accept an array with same number of elements than schema maxItems', function () {
        var result = js.validate( [1, 2, 3], { type : 'array', maxItems : 3} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject an array with more number of elements than schema maxItems', function () {
        var result = js.validate( [1, 2, 3], { type : 'array', maxItems : 2} );
        expect( result.valid ).not.toBe( true );
    } );

} );
