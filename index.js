require('dotenv').config();
const { checkOpts } = require("./checkOpts");
const { breakdownEmails } = require("./breakdownEmails");
const argv = process.argv;

if(process.env.TESTING == true) {
    process.env.OUTPUT_DIRECTORY = "test_output/";
} else {
    process.env.OUTPUT_DIRECTORY = "output/";
}

const opts = {
    default: {
        flag: null,
        description: "takes a filepath to a directory and parses emails found there, sorting into subcomponents and attachments",
        operation: () => breakdownEmails(argv[2])
    },
    "-r": {
        flag: "-r",
        description: "takes a filepath to a directory and reads the parsed email and returns information about that email",
        operation: () => console.log("this is the read operation")
    }
}

let next = checkOpts(opts, argv);
next();