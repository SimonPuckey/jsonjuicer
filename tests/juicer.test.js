const juicer = require('../src/juicer');
const json1 = require('./files/1.json');
const json2 = require('./files/2.json');
console.log(json1);

describe('juicer', () =>{
    const testKeys = {
        url: 'url'
    }
    describe(`given json with single ${testKeys.url} key`, () => {
        describe(`and search term matching ${testKeys.url}`, () => {
            test('should retrieve a single value', () => {
                const searchTerm = testKeys.url;
                const result = juicer(json1, searchTerm);
                expect(result.results.length).toBe(1);
            });
            //supercedes above
            // test('should receive expected result', () =>{
            //     const expectation = [];
            //     const result = juicer(json1, searchTerm)
            //     expect(result).toBe(expectation);
            // })
            //is this possible?
            //maybe expose functions
            //should call juice array x times?
            //should call juice object x times?
        });
        // describe("and search key of 'NOT_EXIST'", () => {
        //     test('should retrieve no results', () => {

        //     });
        //     //should call juice array x times?
        //     //should call juice object x times?
        // });

    });
});