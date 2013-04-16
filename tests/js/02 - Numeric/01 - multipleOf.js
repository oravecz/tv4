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
describe( 'The schema\'s multipleOf determines that a schema value is a factor of an instance value', function () {

    var js;

    beforeEach(function() {
        js = new JsonSchema();
    });

    it( 'will accept a schema factor of float values', function () {
        var result = js.validate( 5, {"multipleOf": 2.5} );
        expect( result.valid ).toBe( true );
    } );

    it( 'will reject bad schema factor of float values', function () {
        var result = js.validate( 5, {"multipleOf": 0.75} );
        expect( result.valid ).not.toBe( true );
    } );

    it( 'will accept multipleOf schema when applied to non-numeric values', function () {
        var result = js.validate( '50', {"multipleOf": 25} );
        expect( result.valid ).toBe( true );
    } );


} );
