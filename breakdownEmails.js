const fs = require('fs');
const parse = require('parse-email');
const { nameGenerator } = require('./nameGenerator');

const outputPath = process.env.OUTPUT_DIRECTORY;

async function getEmails(path, callback) {
    await fs.readdir(path, (err, files) => {
        if (err) {
            throw new error("could not read this file path", err);
        }

        files.forEach(file => {
            breakdownEmail(`${path}/${file}`);
        })
    })
}

async function makeDirectory(directoryPath) {
    await fs.mkdir(directoryPath, (err) => {
        if (err) {
            throw new error("could not create directory", err)
        }
    })
}

async function parseEmail(filePath) {
    const emailString = await fs.readFileSync(filePath, 'utf8');
    const parsedEmail = await parse(emailString);
    return parsedEmail;
}

async function breakdownEmail(filePath) {
    const parsed = await parseEmail(filePath);
    const generatedName = nameGenerator(parsed);
    const directoryPath = `${outputPath}/${generatedName}`;
    await makeDirectory(directoryPath);
    //TODO: keep doing along app flow, creating files etc.

}

async function breakdownEmails(path) {
    getEmails(path, breakdownEmail);
}

module.exports = { breakdownEmails };