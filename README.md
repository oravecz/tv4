#Tiny Validator (for v4 JSON Schema)

The original version of this library can be found at https://github.com/geraintluff/tv4. Big thanks to
Geraint for placing it in the public domain.

This version is different from the original in that it is built to be deployed as a CommonJS module, and
can be run in a multithreaded environment. It is a compliant JSON Schema validator for
[Json Schema draft 4](http://tools.ietf.org/html/draft-zyp-json-schema-04)

There is support for `$ref` with JSON Pointer fragment paths (```other-schema.json#/properties/myKey```).

>> Note: There is no current support for fetching of external resources yet. This will prove
>> a bit challenging anyway as CommonJS hasn't really standardized a way to do things in a cross-platform
>> way when it comes to making http requests and such. I am thinking about passing in a function to
>> the constructor which will load an external url and return the content.

## Usage

```javascript
var tv4 = new JsonSchema();
var result = tv4.validate(data, schema);
```

The result object will look something like:
```javascript
{
    "valid": "true|false",
    "missing": ["a list of uri's that were referenced, but not found"],
    isMissing: function(url) { returns true; // if the url passed in is missing },
    "errors": [ // Array of ValidationError objects ]
}
```
If valid returns ```false```, then an explanation of why validation failed can be found in ```result.error```.

The error object will look something like:
```json
{
    "message": "Invalid type: string",
    "dataPath": "/intKey",
    "schemaKey": "/properties/intKey/type"
}
```

To enable external schema to be referenced, you use:
```javascript
tv4.addSchema(url, schema);
```

If schemas are referenced (```$ref```) but not known, then validation will return ```true``` and the missing schema(s) will be listed in ```result.missing```.

## Asynchronous validation

Support for asynchronous validation (where missing schemas are fetched) can be added by including an extra JavaScript file.  Currently, the only version requires jQuery (`tv4.async-jquery.js`), but the code is very short and should be fairly easy to modify for other libraries (such as MooTools).

Usage:

```javascript
tv4.validate(data, schema, function (isValid, validationError) { ... });
```

`validationFailure` is simply taken from `tv4.error`. 

## Tests

The tests are spec'd using Jasmine and a configuration is included for karma. Once [Karma is installed](http://karma-runner.github.io/0.8/intro/installation.html)
the test can be run using the command:

```
karma start --single-run --browsers Chrome
```

If you want to run the tests continuously while you code and watch for saved files use:

```
karma start
```

To run all tests on a variety of browsers you can use:

```
karma start --single-run --browsers Chrome,Firefox,Safari
```

## Minifying

There doesn't seem to be a good way to distribute a mininfed version of a library alongside a debug version. The
original ```tv4.min.js``` was produced using the [Google Closure Compiler](http://closure-compiler.appspot.com/home).

## MIT License

Copyright (c) 2013, Pykl Studios <admin@pykl.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.