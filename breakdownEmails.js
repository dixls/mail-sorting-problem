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

async function makeDirectory(directoryPath) {
    await fs.mkdir(directoryPath, (err) => {
        if (err) {
            console.error("could not create directory", err)
            process.exit(1);
        }
    })
    console.log(`created new folder at ${directoryPath}`)
}

async function writeBody(parsedEmail, directoryPath) {
    await fs.writeFile(`${directoryPath}/body.txt`, parsedEmail.text, 'utf8', (err) => {
        if (err) {
            console.log(typeof parsedEmail.text);
            console.error(`error writing body.txt to ${directoryPath}`, err);
            process.exit(1);
        }
    });
    await fs.writeFile(`${directoryPath}/body.htm`, parsedEmail.html, 'utf8', (err) => {
        if (err) {
            console.log(parsedEmail.html);
            console.error(`error writing body.htm to ${directoryPath}`, err);
            process.exit(1);
        }
    });

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
    await makeDirectory(directoryPath);
    await writeBody(parsed, directoryPath);

}

async function breakdownEmails(path) {
    getEmails(path, breakdownEmail);
}

module.exports = { breakdownEmails };