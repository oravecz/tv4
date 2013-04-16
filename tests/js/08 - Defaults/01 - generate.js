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
describe( 'JsonSchema can generate default data structures based on schema values and', function () {
    var js;
    beforeEach( function () {
        js = new JsonSchema();
    } );

    describe( 'If no instance is yet created', function () {
        it( 'cannot set required properties on root object', function () {
            var schema = {
                type : 'object',
                default : {}
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( null );
        } );

    } );

    describe( 'If an existing instance already exists', function () {

        it( 'will return the instance when incompatible', function () {
            var schema = {
                type : 'number',
                default : 5
            };
            var obj = js.generate( {}, schema );
            expect( obj ).toEqual( {} );
        } );

        it( 'will not append values if required is not present', function () {
            var schema = {
                type : 'object',
                properties : {
                    child : {
                        type : 'number',
                        default : 6
                    }
                }
            };
            var obj = js.generate( {}, schema );
            expect( obj ).toEqual( {} );
        } );

        it( 'will append values to the current instance', function () {
            var schema = {
                type : 'object',
                required: ['child'],
                properties : {
                    child : {
                        type : 'number',
                        default : 6
                    }
                }
            };
            var obj = js.generate( {}, schema );
            expect( obj ).toEqual( { child : 6 } );
        } );

        it( 'will assign defaults to all array elements', function () {
            var schema = {
                type : 'object',
                properties : {
                    employees : {
                        type : 'array',
                        items : {
                            type : 'object',
                            required: ['status'],
                            properties : {
                                name : {
                                    type : 'string'
                                },
                                status : {
                                    type : 'string',
                                    default : 'candidate'
                                }
                            }
                        }
                    }
                }
            };
            var obj = js.generate( { employees : [
                { name : 'fred' },
                { name : 'barney' }
            ]}, schema );
            expect( obj ).toEqual( { employees : [
                { name : 'fred', status : 'candidate' },
                { name : 'barney', status : 'candidate' }
            ]} );
        } );

        it( 'will create nested structure without modifying the original instance', function () {
            var schema = {
                type : 'object',
                required: ['child'],
                properties : {
                    child : {
                        type : 'object',
                        default : {},
                        required: ['grandchild'],
                        properties : {
                            grandchild : {
                                type : 'object',
                                default : {},
                                required: ['greatgrandchild'],
                                properties : {
                                    'greatgrandchild' : {
                                        type : 'string',
                                        default : 'kathy'
                                    }
                                }
                            }
                        }
                    }
                }
            };
            var obj = js.generate( {}, schema );
            expect( obj ).toEqual( { child : { grandchild : { greatgrandchild : 'kathy'} } } );

            var instance = { gold : 1751.23, child : { grandchild : { age : 23}}};
            obj = js.generate( instance, schema );
            expect( obj ).toEqual( { gold : 1751.23, child : { grandchild : { age : 23, greatgrandchild : 'kathy'} } } );
            expect( instance ).toEqual( { gold : 1751.23, child : { grandchild : { age : 23}}} );
        } );

        it( 'will not modify the original instance with an array', function () {
            var schema = {
                type : 'object',
                default : {},
                properties : {
                    child : {
                        type : 'array',
                        default : {},
                        properties : {
                            amount : {
                                type : 'number',
                                default : 0.00
                            }
                        }
                    }
                }
            };
            var instance = { child : [
                { name : 'fred' },
                { name : 'barney' }
            ]};
            js.generate( instance, schema );
            expect( instance ).toEqual( { child : [
                { name : 'fred' },
                { name : 'barney' }
            ]} );
        } );
    } );
} );
