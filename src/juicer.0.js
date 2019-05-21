const searchResult = {
    results: [],
    keysFound: 0,
    ndzTrvrzd:0
};

const validateJson = (json) => {
    if(!typeof json === 'object'&& !Array.isArray(json)){
        throw new Error('Top level JSON element should be object or array');
    }
};

const isObject = (input) => typeof input === 'object' && !Array.isArray(input);



module.exports =  (json,searchTerm) => { //(fruit, flavour)! [div!]   
    //TODO: make these conditional rules functions? will need to object as not dependent each other not standalone
    validateJson(json);

    const twistArray = (arr)=>{
        searchResult.ndzTrvrzd++;
        arr.forEach(function(item){
            if(typeof item === 'object'){
                juiceObject(item);
            }

            if(Array.isArray(item)){
                twistArray(item);
            }
        });  
    };

    const juiceObject = (obj) => {
        searchResult.ndzTrvrzd++;
        for(var prop in obj) {
            if (prop === searchTerm){ //and === string
                searchResult.keysFound++; //computed properties possible? is length of result array
                searchResult.results.push(obj[prop]);
            }

            objectOrArray(obj[prop]);
        }
    };

    const objectOrArray = (input) => {
        isObject(input) && juiceObject(input);
        Array.isArray(input) && twistArray(input);
    }

    objectOrArray(json);

    return searchResult;


}



