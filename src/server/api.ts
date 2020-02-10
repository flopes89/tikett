import express from "express";
import { createLogger } from "./logger";

export const apiRouter = express.Router();

const LOG = createLogger("api");

apiRouter.get("/file/*", (req, res) => {
    const path = req.params[0];
    LOG.debug(`Sending file [${path}]`);
    res.sendFile(path);
});
