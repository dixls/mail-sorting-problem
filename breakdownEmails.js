const fs = require('fs');

function breakdownEmails (path) {
    fs.readdir(path, (err, files) => {
        if (err) {
            throw err ("could not read this file path");
        }

        files.forEach(file => {
            console.log(file);
        })
    })
}

module.exports = {breakdownEmails};