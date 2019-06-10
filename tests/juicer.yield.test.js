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
                const expectedResults = [ 
                        'http://hostname.com/resource1',
                        'http://hostname.com/resource2' 
                    ];
                expect(result).toEqual(expectedResults);
            });
        });
        describe(`and json1`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = yieldJuice(json1, searchTerm);
                const expectedResults = [ 
                        'http://hostname.com/resource1'
                    ];
                expect(result).toEqual(expectedResults);
            });
        });
        describe(`and json2`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.url;
                const result = yieldJuice(json2, searchTerm);
                const expectedResults = [ 
                        'http://hostname.com/resource1',
                        'http://hostname.com/resource2',
                        'http://hostname.com/resource3',
                        'http://hostname.com/resource4'

                    ];
                console.log('RESULT IS:', result);
                expect(result).toEqual(expectedResults);
            });
        });
    });
});
