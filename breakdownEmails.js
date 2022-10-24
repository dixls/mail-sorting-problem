const fs = require('fs');

async function getEmails(path) {
    await fs.readdir(path, (err, files) => {
        if (err) {
            throw new error("could not read this file path");
        }

        files.forEach(file => {
            console.log(file);
        })
    })
}

module.exports = { getEmails };