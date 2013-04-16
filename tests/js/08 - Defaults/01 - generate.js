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
        it( 'will create a new object if one does not yet exist', function () {
            var schema = {
                type : 'object',
                default : {}
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( {} );
        } );

        it( 'will create a primitive type', function () {
            var schema = {
                type : 'number',
                default : 5
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( 5 );
        } );

        it( 'will create a nested structure with properties', function () {
            var schema = {
                type : 'object',
                properties : {
                    child : {
                        type : 'number',
                        default : 6
                    }
                },
                default : {}
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( { child : 6 } );
        } );

        it( 'will create a nested structure with additional properties', function () {
            var schema = {
                type : 'object',
                additionalProperties : {
                    child : {
                        type : 'boolean',
                        default : true
                    }
                },
                default : {}
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( { child : true } );
        } );

        it( 'will create a nested structure with both properties and additional properties', function () {
            var schema = {
                type : 'object',
                properties : {
                    child : {
                        type : 'boolean',
                        default : true
                    }
                },
                additionalProperties : {
                    sibling : {
                        type : 'integer',
                        default : 5
                    }
                },
                default : {}
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( { child : true, sibling : 5 } );
        } );

        it( 'will create an array structure', function () {
            var schema = {
                type : 'array',
                default : []
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( [] );
        } );

        it( 'will create a array structure with some elements', function () {
            var schema = {
                type : 'array',
                default : [
                    {},
                    {}
                ],
                additionalItems : {
                    type: 'object',
                    properties: {
                        name : {
                            type : 'string',
                            default : 'fred'
                        }
                    }
                }
            };
            var obj = js.generate( schema );
            expect( obj ).toEqual( [
                {name : 'fred'},
                {name : 'fred'}
            ] );
        } );

        it( 'will create a nested structure at various levels of nesting', function () {
            var schema = {
                type : 'object',
                default : {},
                properties : {
                    child : {
                        type : 'object',
                        default : {},
                        properties : {
                            grandchild : {
                                type : 'object',
                                default : {},
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
            var obj = js.generate( schema );
            expect( obj ).toEqual( { child : {grandchild : {greatgrandchild : 'kathy'}} } );
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

        it( 'will append values to the current instance', function () {
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

        it( 'will not modify the original instance', function () {
            var schema = {
                type : 'object',
                default : {},
                properties : {
                    child : {
                        type : 'object',
                        default : {},
                        properties : {
                            grandchild : {
                                type : 'object',
                                default : {},
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
            var instance = { gold : 1751.23, child : { grandchild : { age : 23}}};
            var obj = js.generate( instance, schema );
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
            var obj = js.generate( instance, schema );
            expect( instance ).toEqual( { child : [
                { name : 'fred' },
                { name : 'barney' }
            ]} );
        } );
    } );
} );
