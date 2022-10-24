const { checkOpts } = require("../checkOpts");

describe("test the checkOpts function", () => {
    const testOpts = {
        default: {
            flag: null,
            description: "test description default",
            operation: () => console.log("this is default")
        },
        "-o1": {
            flag: "-o1",
            description: "test description for option 1",
            operation: () => console.log("this is option1")
        },
    };

    test("test no additional args, should end with error and message", () => {
        process.argv = ['node', 'index.js'];
        const noArgs = () => {
            checkOpts(testOpts, process.argv)
        }
        expect(noArgs).toThrow('No parameters');
    })
});