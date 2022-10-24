function nameGenerator(parsedEmail) {
    const fromAddress = parsedEmail.from.value[0].address.replace(/\W/g, '');
    const toAddress = parsedEmail.to.value[0].address.replace(/\W/g, '');
    const subject = parsedEmail.subject.replace(/\W/g, '');
    const messageId = parsedEmail.messageId.replace(/\W/g, '');
    
    const generatedName = fromAddress+toAddress+subject+messageId;

    return generatedName;
};

module.exports = { nameGenerator };