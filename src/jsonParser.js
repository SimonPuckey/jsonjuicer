// const json = require('../../files/test-bookmarks.json');
// const json = require('../../canary.json');
// const fs = require('fs');
// const path = require('path');
let ndzTrvrzd = 0;
let urlsFound = 0;

const outputFileName = 'urls.txt'; //pass in as arg?

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
        for(var prop in obj) {
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


