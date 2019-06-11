const yieldJuice = require('../src');
const json0 = require('./files/0.json');
const json1 = require('./files/1.json');
const json2 = require('./files/2.json');

describe('juicer', () =>{
    const testKeys = {
        searchFor: 'MATCHING_KEY'
    }
    describe(`given search term ${testKeys.searchFor}`, () => {
        describe(`and json0`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.searchFor;
                const result = yieldJuice(json0, searchTerm);
                const expectedResults = [ 
                        'matching_value_1',
                        'matching_value_2' 
                    ];
                expect(result).toEqual(expectedResults);
            });
        });
        describe(`and json1`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.searchFor;
                const result = yieldJuice(json1, searchTerm);
                const expectedResults = [ 
                        'matching_value_1'
                    ];
                expect(result).toEqual(expectedResults);
            });
        });
        describe(`and json2`, () => {
            test('returns the expected result', () => {
                const searchTerm = testKeys.searchFor;
                const result = yieldJuice(json2, searchTerm);
                const expectedResults = [ 
                    'matching_value_1',
                    'matching_value_2' ,
                    'matching_value_3',
                    'matching_value_4' 

                    ];
                expect(result).toEqual(expectedResults);
            });
        });
    });
});
