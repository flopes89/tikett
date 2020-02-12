import express from "express";
import { createLogger } from "./logger";

export const apiRouter = express.Router();

const LOG = createLogger("api");

apiRouter.get("/file", (req, res) => {
    const path = req.query.path;
    LOG.debug("Sending file [%s]", path);
    res.sendFile(path);
});
