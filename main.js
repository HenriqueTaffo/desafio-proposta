const express = require("express");
const fs = require("fs");
const utils = require("./utils");
const port = 3003;
console.log("Starting app on port:", port);
const app = express();

app.use(express.json());

app.post("/api/proposta/validar", function (req, res) {

    const proposals = req.body.propostas;

    console.log("propostas received:", JSON.stringify(proposals));

    const result = utils.saveFileValidProposals('./json/proposals.json', proposals);

    console.log("result:", JSON.stringify(result));
    res.json(result);

})
app.listen(port);

