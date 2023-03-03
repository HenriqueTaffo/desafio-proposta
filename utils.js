const fs = require('fs');

const validateProposalId = (proposal) => {

    var localProposal = String(proposal);
    const code = parseInt(localProposal.substring(localProposal.length - 2));
    const arrNumbers = localProposal.split("", 8);
    var sumEven = 0;
    var sumOdd = 0;
    var currentElement = 0;

    arrNumbers.forEach(element => {
        currentElement = parseInt(element);

        if (currentElement % 2 === 0) {
            sumEven += currentElement;

            return;
        }

        sumOdd += currentElement;
    });

    var verifyCode = Math.round((sumEven > sumOdd) ? (sumEven - sumOdd) / 2 : (sumOdd - sumEven) / 2);

    return code === verifyCode;
};

const saveFileProposals = (path, proposals) => {

    let countValid = 0;
    let countInvalid = 0;

    proposals.forEach(element => {
        let verifyCode = "00" + element.produto.nrVersaoOferta
        let proposal = element.propostaId + verifyCode.substring(verifyCode.length - 2);
        if (validateProposalId(proposal)) {
            console.log("proposal:", proposal, "Valid");
            countValid++;
        } else {
            console.log("proposal:", proposal, "Invalid");
            countInvalid++;
        }
    })

    fs.writeFileSync(path, JSON.stringify(proposals));

    console.log("valid:", countValid, "invalid:", countInvalid);
    return {
        valid: countValid,
        invalid: countInvalid
    }
}

module.exports.validateProposalId = validateProposalId;
module.exports.saveFileValidProposals = saveFileProposals;