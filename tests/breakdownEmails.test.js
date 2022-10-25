require('dotenv').config();
const parse = require('parse-email');
const { getEmails, makeDirectory, writeBody, writeFiles, parseEmail, breakdownEmail, breakdownEmails } = require('../breakdownEmails');

process.env.TESTING = true;
process.env.OUTPUT_DIRECTORY = "test_output/";

describe("Testing getEmails function", () => {
    test("provided an invalid path, error thrown, process exited", () => {
        try {
            getEmails("notARealPath/NothingHere", console.log);
        } catch(e){
            expect(e).toEqual("could not read this file path");
        }
    });
    test("provided a valid path, no errors are thrown", () => {
        const logSpy = jest.spyOn(console, 'log');
        getEmails("test_emails/", console.log);
        expect(logSpy).toHaveBeenCalledWith("test_emails/Test1.eml");
    })

});

// describe("", () => {

//     test("", () => {

//     })
// })

// describe("", () => {

//     test("", () => {
        
//     })
// })

// describe("", () => {

//     test("", () => {
        
//     })
// })

// describe("", () => {

//     test("", () => {
        
//     })
// })

// describe("Test breakdownEmail function", () => {
//     const validEmailPath = "test_emails/test2.eml";
//     test("provided a valid email path, " () => {

//     })
// });

// describe("", () => {

//     test("", () => {
        
//     })
// })
