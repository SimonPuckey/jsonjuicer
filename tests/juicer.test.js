const juicer = require('../src/juicer');
const json0 = require('./files/0.json');
const json1 = require('./files/1.json');
const json2 = require('./files/2.json');

describe('juicer', () =>{
    const testKeys = {
        url: 'url'
    }
    describe(`given search term ${testKeys.url}`, () => {
        describe(`and json0`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = juicer(json0, searchTerm);
                console.log('results are', result);
                const expectedResult = { 
                    results:[ 
                        'http://hostname.com/resource1',
                        'http://hostname.com/resource2' 
                    ],
                    keysFound: 2,
                    ndzTrvrzd: 3 
                };
                expect(result).toEqual(expectedResult);
            });
        });
        describe(`and json1`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = juicer(json1, searchTerm);
                console.log('results are', result);
                const expectedResult = { 
                    results:[ 
                        'http://hostname.com/resource1'
                    ],
                    keysFound: 1,
                    ndzTrvrzd: 4 
                };
                expect(result).toEqual(expectedResult);
            });
        });
        describe(`and json2`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = juicer(json2, searchTerm);
                console.log('results are', result);
                const expectedResult = { 
                    results:[ 
                        'http://hostname.com/resource1',
                        'http://hostname.com/resource2',
                        'http://hostname.com/resource3',
                        'http://hostname.com/resource4'

                    ],
                    keysFound: 4,
                    ndzTrvrzd: 15
                };
                expect(result).toEqual(expectedResult);
            });
        });
    });
});
