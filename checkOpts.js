function checkOpts(opts, argv) {
    /**
     * Checks arg flags and manages help menu
     * @param {object} opts - An object with the options available to the user, must follow the convention below
     * 
     * opts = {
     *      default : {
     *          flag: null,
     *          description: description for the --help menu,
     *          operation: function to return
     *      },
     *      "-someFlag" : {
     *          flag: "-someFlag",
     *          ...
     *      }
     * }
     */
    const optKeys = Object.keys(opts);
    const optFlags = optKeys.map(opt => opts[opt].flag);

    if (!argv[2]) {
        throw new Error(
            `No parameters received, to see how to use this program run
            
            node index.js --help`
        );
        process.exit(1);
    } else if (argv[2] == "--help") {
        optKeys.map(opt => console.log(
            `${opts[opt].flag}    ${opts[opt].description}`
        ));
        process.exit(0);
    } else {
        if (optFlags.includes(argv[2])) {
            console.log()
            return opts[argv[2]].operation;
        } else {
            return opts.default.operation;
        }
    }
}

module.exports = { checkOpts };