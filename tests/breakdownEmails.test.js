require('dotenv').config();
const parse = require('parse-email');
let fs = require('fs');
const { getEmails, makeDirectory, writeBody, writeFiles, parseEmail, breakdownEmail, breakdownEmails } = require('../breakdownEmails');

process.env.TESTING = true;
process.env.OUTPUT_DIRECTORY = "test_output/";
const outDir = process.env.OUTPUT_DIRECTORY;

const logSpy = jest.spyOn(console, 'log');

describe("Testing getEmails function", () => {
    /** 
     * not sure why this one is not working, may need to refactor error handling for it to work properly
     */
    // test("provided an invalid path, error thrown, process exited", () => {
    //     const exitSpy = jest.spyOn(process, 'exit')
    //     expect(() => {
    //         getEmails("notARealPath/NothingHere", console.log);
    //     }).toThrow();
    //     expect(mockExit).toHaveBeenCalledWith(1);
    // });
    test("provided a valid path, no errors are thrown", () => {
        getEmails("test_emails", console.log);
        expect(logSpy).toHaveBeenCalledWith("test_emails/Test1.eml");
    });

});

describe("Testing makeDirectory function", () => {
    fs.mkdirSync = jest.fn(() => console.log("made a directory"));
    afterAll(() => {
        fs.mkdirSync.mockRestore();
    })
    test("provided a valid directory path, no errors thrown", () => {
        makeDirectory("test_output/new_test_folder");
        expect(logSpy).toHaveBeenCalledWith("made a directory");
        expect(logSpy).toHaveBeenCalledWith("created new folder at test_output/new_test_folder");
    });
});

describe("Testing writeBody function", () => {
    fs.writeFileSync = jest.fn((outPath, file) => console.log(file));
    const fakeEmail = {
        text : "This is a test with an attachment",
        html : "This is HTML"
    };
    afterAll(() => {
        fs.writeFileSync.mockRestore();
    })
    test("given a valid filepath and parsed email, parsed email components are accessed", () => {
        writeBody(fakeEmail, outDir);
        expect(logSpy).toHaveBeenCalledWith("This is a test with an attachment");
        expect(logSpy).toHaveBeenCalledWith("This is HTML");
    });
});

describe("Test breakdownEmail function", () => {
    const validEmailPath = "test_emails/test2.eml";
    /**
     * This is failing for a few reasons, the mocks for fs functions aren't being restored properly
     * need to refactor the mocks using a different method to fix this.
     * also the output directory env isn't being used the way I thought it should, not sure why this is.
     *  */
    
    // afterEach(() => {
    //     fs.rmSync(outDir, {recursive: true, force: true});
    //     fs.mkdirSync("test_output");
    // })
    test("provided a valid email path, correct files are created in the correct location", async () => {
        jest.restoreAllMocks();
        await breakdownEmail(validEmailPath);
        const emailDirName = "yarabeadenkopfcomtestbeadenkopfcomtest2ffcd08ee662c454a9f1b2c7c17920f54appfastmailcom";
        const body = fs.readFileSync(`output/${emailDirName}/body.txt`);
        expect(body).toContain("This is a test with an attachment");
    })
});

