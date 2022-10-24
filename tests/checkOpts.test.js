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
    });
    test("test args, but no flags, should pass default operation", () => {
        const logSpy = jest.spyOn(console, 'log');
        process.argv = ['node', 'index.js', 'something else'];
        let next = checkOpts(testOpts, process.argv);
        next();
        expect(logSpy).toHaveBeenCalledWith("this is default");
    });
    test("test args with valid flag, should pass o1", () => {
        const logSpy = jest.spyOn(console, 'log');
        process.argv = ['node', 'index.js', '-o1'];
        let next = checkOpts(testOpts, process.argv);
        next();
        expect(logSpy).toHaveBeenCalledWith("this is option1");
    })
});