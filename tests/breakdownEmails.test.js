const { getEmails } = require('../breakdownEmails');

describe("Testing getEmails function", () => {

    test("test provided an invalid path, error thrown, process exited", async () => {
        try {
            await getEmails("notARealPath/NothingHere");
        } catch(e){
            expect(e).toEqual("could not read this file path");
        }
    });
    
});

describe("Test breakdownEmails function", () => {
    const valid
    test("")
});
