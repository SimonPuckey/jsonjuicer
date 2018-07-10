//TODO: worry about node and key counts later
let ndzTrvrzd = 0;
let keysFound = 0;

module.exports = (json,searchKey) =>{ //(fruit, flavour)! [div!]
    //TODO: need to assess if json is array or object and call relevant method
    //TODO: make ternary when happy?
    //TODO: also function to check for invalid json
    const juiceJson = (json)=> {
        if(typeof json === 'object' && !Array.isArray(json)){
            juiceObject(json);
        }

        if(Array.isArray(json)){
            juiceArray(json);
        }
    };

    const juiceArray= ()=>{
        

    };

    const juiceObject = () => {

    };

    //TODO: make init and call of methods (mod structure) nicer
    jsonJuice(json);

}








    const traverseArray = (arr) => {
        ndzTrvrzd++;
        arr.forEach(function(item){
            if(typeof item === 'object'){
                traverseObj(item);
            }

            if(Array.isArray(item)){
                traverseArray(item);
            }
        });
    }

    const traverseObj = (obj) => {
        ndzTrvrzd++;
        //TODO: forEach or map over Object.entries??
        for(var prop in obj) {
            //TODO: convert these if's to array of rules
            if (prop === 'url'){
                urlsFound++;
                outputUrls(obj[prop]);
            }
            //checks not primitive but also not array, which is also an object
            if(typeof obj[prop] === 'object' && !Array.isArray(obj[prop])){
                traverseObj(obj[prop]);
            }

            if(Array.isArray(obj[prop])){
                traverseArray(obj[prop]);
            }

        }
    };

    const outputUrls = (url) => {
        const outputPath = path.join(__dirname,'..', 'io');
        fs.appendFile(`${outputPath}/urls.txt`, `${url}\n`);
    };

    const deleteOutputUrls = () => {
        const outputFilePath = path.join(__dirname,'..','io',outputFileName);
        if(fs.existsSync(outputFilePath)){
            fs.unlink(outputFilePath, () => {console.log('file deleted')});
        }
    };

    deleteOutputUrls();
    traverseObj(json);
    console.log('Nodes traversed: ', ndzTrvrzd);
    console.log('Urls found: ', urlsFound);


