function* searchObject (obj, searchTerm) {
    for(var prop in obj) {
        if (prop === searchTerm) yield obj[prop];
        if (prop !== searchTerm && typeof obj[prop] !== 'string'){
            const searchStrategy = getSearchStrategy(obj[prop]);
            const json = obj[prop];
            console.log('before yield new search strategy in search object')
            yield * searchStrategy(json,searchTerm);
        }
    }
};

function* searchArray (arr, searchTerm) {
    for(const json of arr){
        const searchStrategy = getSearchStrategy(json); 
        yield * searchStrategy(json,searchTerm);
    } 
};

const validateSearchTerm = (searchTerm) => {
    if(isNullOrWhitespace(searchTerm)) throw new Error('Search term must not be empty');
    return searchTerm;
};

const getSearchStrategy = (data) => {
    if(isObject(data)) return searchObject;
    if(Array.isArray(data)) return searchArray;
};

const getValidSearchStrategy = (data, getSearchStrategy) => {
    const strategy = getSearchStrategy(data);
    if(strategy) return strategy;
    if(!strategy) throw new Error('to be searched JSON element should be object or array');
}

//utility
const isObject = (input) => typeof input === 'object' && !Array.isArray(input);
const isNullOrWhitespace = ( input ) => !input || !input.trim();


module.exports =  (json,searchFor) => {
    const testResults = [];
    //TODO: restructure & tighten this further?
    const searchStrategy = getValidSearchStrategy(json, getSearchStrategy);
    searchFor = validateSearchTerm(searchFor);

    for(let x of searchStrategy(json,searchFor)){
        testResults.push(x);
    }
    return testResults;
}



