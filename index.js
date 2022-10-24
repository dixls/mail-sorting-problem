const { checkOpts } = require("./checkOpts");
const argv = process.argv;

OUTPUT_DIRECTORY = "/output";

const opts = {
    default: {
        flag: null,
        description: "takes a filepath to a directory and parses emails found there, sorting into subcomponents and attachments",
        operation: () => console.log("this is default")
    },
    "-r": {
        flag: "-r",
        description: "takes a filepath to a directory and reads the parsed email and returns information about that email",
        operation: () => console.log("this is the read operation")
    }
}

let next = checkOpts(opts, argv);
next();