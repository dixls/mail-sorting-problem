const fs = require('fs');
const parse = require('parse-email');
const { nameGenerator } = require('./nameGenerator');

async function getEmails(path, callback) {
    await fs.readdir(path, (err, files) => {
        if (err) {
            throw new error("could not read this file path");
        }

        files.forEach(file => {
            parseEmail(`${path}/${file}`);
        })
    })
}

async function parseEmail(filePath) {
    const emailString = await fs.readFileSync(filePath, 'utf8');
    const parsedEmail = await parse(emailString);
    return parsedEmail;
}

async function breakdownEmail(filePath) {
    const parsed = parseEmail(filePath);
    const generatedName = nameGenerator(parsed);
    
}

async function breakdownEmails(path) {
    getEmails(path, breakdownEmail);
}

module.exports = { breakdownEmails };