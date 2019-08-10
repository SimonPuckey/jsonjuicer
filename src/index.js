//support funcs
const isObject = (input) => typeof input === 'object' && !Array.isArray(input);
const isNullOrWhitespace = ( input ) => !input || !input.trim();
const isSearchable = (val) => isNaN(val) && typeof val !== 'string';

const validateSearchTerm = (searchTerm) => {
    if(isNullOrWhitespace(searchTerm)) throw new Error('Search term must not be empty');
    return searchTerm;
};

const getValidSearchStrategy = (data, getSearchStrategy) => {
    const strategy = getSearchStrategy(data);
    if(strategy) return strategy;
    if(!strategy) throw new Error('to be searched JSON element should be object or array');
}

const getSearchStrategy = (data) => {
    if(isObject(data)) return searchObject;
    if(Array.isArray(data)) return searchArray;
};

//search funcs
function* searchArray (arr, searchTerm) {
    for(const json of arr){
        const searchStrategy = getSearchStrategy(json); 
        yield * searchStrategy(json,searchTerm);
    } 
};

function* searchObject (obj, searchTerm) { 
    for(var key in obj) {
        const val = obj[key];
        if (key === searchTerm) yield val;
        if (isSearchable(val)){
            const searchStrategy = getSearchStrategy(val);
            const json = val;
            console.log("key before failure", key);
            yield * searchStrategy(json, searchTerm);
        }
    }
};

//main func
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