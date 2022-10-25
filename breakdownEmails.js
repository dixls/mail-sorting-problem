const fs = require('fs');
const parse = require('parse-email');
const { nameGenerator } = require('./nameGenerator');

const outputPath = process.env.OUTPUT_DIRECTORY;

async function getEmails(path, callback) {
    await fs.readdir(path, (err, files) => {
        if (err) {
            throw new Error("could not read this file path");
        }

        files.forEach(file => {
            breakdownEmail(`${path}/${file}`);
        })
    })
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
    } catch (err) {
        console.error(`error writing files`, err);
        process.exit(1);
    }
}

function writeFiles(parsedEmail, directoryPath, generatedName, fileToWrite) {
    try {
        fs.writeFileSync(`${directoryPath}/${generatedName}_${fileToWrite.filename}`, fileToWrite.content, fileToWrite.headers['content-transfer-encoding'])
    } catch (err) {
        console.error(`error writing files`, err);
        process.exit(1);
    }
}

async function parseEmail(filePath) {
    const emailString = await fs.readFileSync(filePath, 'utf8');
    const parsedEmail = await parse(emailString);
    return parsedEmail;
}

async function breakdownEmail(filePath) {
    const parsed = await parseEmail(filePath);
    const generatedName = nameGenerator(parsed);
    const directoryPath = `${outputPath}${generatedName}`;
    makeDirectory(directoryPath);
    writeBody(parsed, directoryPath);
    if(parsed.attachments){
        parsed.attachments.map(file => writeFiles(parsed, directoryPath, generatedName, file))
    }
    console.log(parsed.attachments);

}

async function breakdownEmails(path) {
    getEmails(path, breakdownEmail);
}

module.exports = { breakdownEmails };