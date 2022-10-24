const argv = process.argv;

function checkOpts(opts) {
    /**
     * Checks arg flags and 
     */
    if (!argv[2]) {
        console.log(
            `No parameters received, to see how to use this program run
            
            node index.js --help`
        );
        process.exit(1);
    }
    else if (argv[2] == "--help") {
            Object.keys(opts).map(opt => console.log(
                `${opts[opt].flag}    ${opts[opt].description}`
            ));
            process.exit(0);
        }
}

module.exports = { checkOpts };