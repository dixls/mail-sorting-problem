function makeManifest (parsedEmail, filePath) {
    /**
     * I'm not entirely sure what pieces are supposed to be in the manifest,
     * so I'm just storing the whole thing as JSON
     */

    const emailObject = {...parsedEmail};
    emailObject.originalFileLocation = filePath;
    return {
        content: JSON.stringify(emailObject),
        filename: "manifest.json"
    };
}

module.exports = makeManifest;