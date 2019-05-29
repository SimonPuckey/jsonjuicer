
module.exports =  (json,searchTerm) => { //(fruit, flavour)! [div!]
    
    const searchResult = {
        results: [],
        get keysFound() {
            return this.results.length;
		},
        ndzTrvrzd:0
    };

    const juiceJson = (json)=> {

        //TODO: make these conditional rules functions? will need to object as not dependent each other not standalone
        //first validate object or array...
        if(!typeof json === 'object'&& !Array.isArray(json)){
            throw new Error('Top level JSON element should be object or array');
        }

        //TODO: because of validation can make ternary?
        //check if object then enter recursive func...
        if(typeof json === 'object' && !Array.isArray(json)){
            juiceObject(json);
        }

        //check if array then enter recursive func...
        if(Array.isArray(json)){
            juiceArray(json);
        }

        return searchResult;
    };

    const juiceArray= (arr)=>{
        searchResult.ndzTrvrzd++;
        arr.forEach(function(item){
            if(typeof item === 'object'){
                juiceObject(item);
            }

            if(Array.isArray(item)){
                juiceArray(item);
            }
        });  
    };

    const juiceObject = (obj) => {
        searchResult.ndzTrvrzd++; //TODO: this means matching key is counted as a node
        for(var prop in obj) {
            if (prop === searchTerm){
                //searchResult.keysFound++; //computed properties possible? is length of result array
                searchResult.results.push(obj[prop]);
            }
            //checks not primitive but also not array, which is also an object
            if(typeof obj[prop] === 'object' && !Array.isArray(obj[prop])){
                juiceObject(obj[prop]);
            }

            if(Array.isArray(obj[prop])){
                juiceArray(obj[prop]);
            }

        }
    };

    //TODO: make init and call of methods (mod structure) nicer
    return juiceJson(json);
}



