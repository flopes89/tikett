const express = require("express");
const router = express.Router();

const LOG = require("./logger")("api");

router.get("/file/*", (req, res) => {
    const path = req.params[0];
    LOG.debug(`Sending file [${path}]`);
    res.sendFile(path);
});

module.exports = router;
