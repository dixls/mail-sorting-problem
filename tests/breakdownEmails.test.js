require('dotenv').config();
const { getEmails } = require('../breakdownEmails');

process.env.TESTING = true;
process.env.OUTPUT_DIRECTORY = "test_output/";

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
    const validEmailPath = "test_emails/test1.eml";
    test("")
});
