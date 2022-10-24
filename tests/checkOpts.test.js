const { checkOpts } = require("../checkOpts");

describe("test the checkOpts function", function () {
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

    
});