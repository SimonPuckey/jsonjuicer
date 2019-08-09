# Json Juicer

Recursively searches JSON object for keys and retrieves associated value

Accepts JSON to be searched and key to be searched for

Should be able to insert into a functional pipeline that has already received JSON object

Have refactored to be less imperative. Now calls generator functions recursively.

Could I try a stack based (rather than recursive) algorithm where each node to be searched is put on a stack, then popped off once searched?

## Module loading

There are 2 main reasons why (for now) this library uses Common JS require rather than takes advantage of the latest Node support for ESG imports async module loading.

* CommonJS allows loading JSON into a module by using module loading syntax. This is useful for testing and a bit easier than reading from file.
* I cant remember the other one right now..!