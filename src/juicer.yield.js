function* searchObject ({json:obj, searchTerm}) {
    console.log('in searchObject with input:', obj, searchTerm);
    for(var prop in obj) {
        console.log('in loop');
        console.log('prop', prop);
        if (prop === searchTerm){ //and === string
            //TODO: worry about keys found and traversed nodes later
            //searchResult.keysFound++; //computed properties possible? is length of result array
            console.log('return match', obj[prop]);
            yield obj[prop];
            //searchResult.results.push(obj[prop]);
        }
        if(prop !== searchTerm && typeof obj[prop] !== 'string'){
            //search again
            const searchStrategy = getSearchStrategy(obj[prop]);
            const json = obj[prop];
            console.log('before yield new search strategy in search object')
            yield * searchStrategy({json,searchTerm});
        }
        //if prop not match && prop is string do not search again
    }
};

function* searchArray ({json:arr, searchTerm}) {
    console.log('in searcharray with array:', arr);
    for(const json of arr){
                //TODO: at this point should ignore strings, not throw error
        //for now wrap in if
        //but get search strategy should be more appropriate
        console.log('in for..of');
        const searchStrategy = getSearchStrategy(json); 
        yield * searchStrategy({json,searchTerm});
    } 
};

//make ternary even when throwing errors?
const getSearchTerm = (searchTerm) => {
    if(isNullOrWhitespace(searchTerm)){
        throw new Error('Search term must not be empty');
    }else{
        return searchTerm;
    }
}

const getSearchStrategy = (data) => {
    if(isObject(data)) return searchObject;
    if(Array.isArray(data)) return searchArray;
}

//validates json and gets search
const getValidSearchStrategy = (data, getStrategy) => {
    const strategy = getStrategy(data);
    if(strategy) return strategy;
    if(!strategy) throw new Error('to be searched JSON element should be object or array');
}

//utility
const isObject = (input) => typeof input === 'object' && !Array.isArray(input);
const isNullOrWhitespace = ( input ) => !input || !input.trim();


module.exports =  (json,searchFor) => {
    const testResults = [];
    const searchStrategy = getValidSearchStrategy(json, getSearchStrategy);
    const searchTerm = getSearchTerm(searchFor);

    //TODO: pass 'get...' funcs into an executeSearchStrategy (or 'search'!) func
    //TODO: make searchStrategy funcs more func-y

    for(let x of searchStrategy({json,searchTerm})){
        console.log('in for of with yielded result: ', x)
        testResults.push(x);
    }
    console.log('test results are: ', testResults);
    return testResults;
}



