//final result state obj
const searchResult = {
    results: [],
    keysFound: 0,
    ndzTrvrzd:0
};

//utility
const isObject = (input) => typeof input === 'object' && !Array.isArray(input);
const isNullOrWhitespace = ( input ) => !input || !input.trim();

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

//search strategies
const searchArray = (arr, term)=>{
    searchResult.ndzTrvrzd++;
    return arr.map(item => {
        console.log('in array for each with item', item)
        const search = getSearchStrategy(item);
        console.log('in array for each before search', item)
        return search(item, term);
    });  
};

const searchObject = (obj, term) => {
    console.log('in search object', obj)
    searchResult.ndzTrvrzd++;
    console.log("@Node: ", searchResult.ndzTrvrzd);
    for(var prop in obj) {
        if (prop === term){ //and === string
            searchResult.keysFound++; //computed properties possible? is length of result array
            // searchResult.results.push(obj[prop]);
            console.log('before return result', obj[prop])
            return obj[prop];
        }else{
            const search = getSearchStrategy(obj[prop]);
            return search(obj[prop],term);
        }
    }
};

module.exports =  (json,searchFor) => {
    //TODO: can combine these...
    const search = getSearchStrategy(json);
    const term = getSearchTerm(searchFor);

    //TODO: getting result from pure function is tricky bit 
    //why was using generators to build a result set
    //or go back to adding to explicitly adding to constant searchResults obj
    let result = search(json,term);
    console.log('in main with result', result)
    searchResult.results.push(result);

    return searchResult;
}