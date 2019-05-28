const searchResult = {
    results: [],
    keysFound: 0,
    ndzTrvrzd:0
};

function* searchObject ({json:obj, searchTerm}) {
    console.log('in searchObject with input:', obj, searchTerm);
    for(var prop in obj) {
        console.log('in loop');
        console.log('prop', prop);
        if (prop === searchTerm){ //and === string
            //TODO: worry about keys found and traversed nodes later
            //searchResult.keysFound++; //computed properties possible? is length of result array
            console.log('return', obj[prop]);
            //yield obj[prop];
            //Todo: if finds search term then needs to stop loop
            return obj[prop];
            //searchResult.results.push(obj[prop]);
        }else{
            const searchStrategy = getSearchStrategy(obj[prop]);
            const json = obj[prop];
            console.log('before yield new search strategy in search object')
            let returnVal = yield * searchStrategy({json,searchTerm});
            yield returnVal;
        }
    }
};
function* searchArray ({json:arr}) {
    console.log('in searcharray with array:', arr);
    
    arr.forEach(function* (json){
        const searchStrategy = getSearchStrategy(json);
        yield* searchStrategy({json,searchTerm});
    });  
};

//make ternary even when throwing errors?
const getSearchTerm = (searchTerm) => {
    if(isNullOrWhitespace(searchTerm)){
        throw new Error('Search term must not be empty');
    }else{
        return searchTerm;
    }
}

//validates json and gets search
const getSearchStrategy = (data) => {
    if(isObject(data)) return searchObject;
    if(Array.isArray(data)) return searchArray;
    throw new Error('to be searched JSON element should be object or array');
}

//utility
const isObject = (input) => typeof input === 'object' && !Array.isArray(input);
const isNullOrWhitespace = ( input ) => !input || !input.trim();


module.exports =  (json,searchFor) => {
    const searchStrategy = getSearchStrategy(json);
    const searchTerm = getSearchTerm(searchFor);

    //TODO: pass 'get...' funcs into an executeSearchStrategy (or 'search'!) func
    //TODO: make searchStrategy funcs more func-y
    const gen = searchStrategy({json,searchTerm});
    var result = gen.next();
    console.log('1st result', result);
    while (!result.done) {
        console.log('in result not done loop',result.value); // 1 2 3 .... 99
        result = gen.next();
    }
    console.log('result before return is', result);
    return result;
}



