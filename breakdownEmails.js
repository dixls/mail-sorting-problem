const fs = require('fs');
require('dotenv').config();
const parse = require('parse-email');
const { nameGenerator } = require('./nameGenerator');
const makeManifest = require('./makeManifest');

const outputPath = process.env.OUTPUT_DIRECTORY;

if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath);
};

async function getEmails(path, callback) {
    try {
        const files = fs.readdirSync(path)
        files.forEach(async file => {
            return await callback(`${path}/${file}`);
        });
    } catch (err) {
        console.error("could not read this file path", err);
        process.exit(1);
    }
}

function makeDirectory(directoryPath) {
    try {
        fs.mkdirSync(directoryPath);
    } catch (err) {
        console.error("could not create directory", err)
        process.exit(1);
    }
    console.log(`created new folder at ${directoryPath}`)
}

function writeBody(parsedEmail, directoryPath) {
    try {
        fs.writeFileSync(`${directoryPath}/body.txt`, parsedEmail.text, 'utf8');
        fs.writeFileSync(`${directoryPath}/body.htm`, parsedEmail.html, 'utf8');
        console.log(`wrote body files to ${directoryPath}`);
    } catch (err) {
        console.error(`error writing files`, err);
        process.exit(1);
    }
}

function writeFiles(directoryPath, generatedName, fileToWrite) {
    try {
        if (fileToWrite.headers) {
            fs.writeFileSync(`${directoryPath}/${generatedName}_${fileToWrite.filename}`, fileToWrite.content, fileToWrite.headers['content-transfer-encoding'])
            console.log(`wrote attachment file to ${directoryPath}`);
        } else {
            fs.writeFileSync(`${directoryPath}/${generatedName}_${fileToWrite.filename}`, fileToWrite.content)
            console.log(`wrote manifest file to ${directoryPath}`);
        }
    } catch (err) {
        console.error(`error writing files`, err);
        process.exit(1);
    }
}

async function parseEmail(filePath) {
    const emailString = fs.readFileSync(filePath, 'utf8');
    const parsedEmail = await parse(emailString);
    return parsedEmail;
}

async function breakdownEmail(filePath) {
    const parsed = await parseEmail(filePath);
    const generatedName = nameGenerator(parsed);
    const directoryPath = `${outputPath}${generatedName}`;
    makeDirectory(directoryPath);
    writeBody(parsed, directoryPath);
    if (parsed.attachments) {
        parsed.attachments.map(file => writeFiles(directoryPath, generatedName, file))
    }
    const manifest = makeManifest(parsed, filePath);
    writeFiles(directoryPath, generatedName, manifest);
    return true;
}

async function breakdownEmails(path) {
    await getEmails(path, breakdownEmail);
}

module.exports = { breakdownEmails, getEmails, makeDirectory, writeBody, writeFiles, parseEmail, breakdownEmail };