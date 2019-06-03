const yieldJuice = require('../src/juicer.yield');
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
                const result = yieldJuice(json0, searchTerm);
                const expectedResult = { 
                    results:[ 
                        'http://hostname.com/resource1',
                        'http://hostname.com/resource2' 
                    ],
                    keysFound: 2,
                    ndzTrvrzd: 3 
                };
                //expect(result).toEqual(expectedResult);
                //TODO: just verify results for now...
                console.log('RESULT IS:', result);
                //expect(result.results).toEqual(expectedResult.results);
                expect(result).toEqual(expectedResult.results);
            });
        });
        describe(`and json1`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = yieldJuice(json1, searchTerm);
                const expectedResult = { 
                    results:[ 
                        'http://hostname.com/resource1'
                    ],
                    keysFound: 1,
                    ndzTrvrzd: 4 
                };
                //expect(result).toEqual(expectedResult);
                //TODO: just verify results for now...
                console.log('RESULT IS:', result);
                expect(result).toEqual(expectedResult.results);
            });
        });
        describe(`and json2`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = yieldJuice(json2, searchTerm);
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
                console.log('RESULT IS:', result);
                expect(result).toEqual(expectedResult.results);
            });
        });
    });
});
