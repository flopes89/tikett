import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";

let win: BrowserWindow|null = null;

// Temporary fix for https://github.com/electron/electron/issues/19468
if (process.platform === 'win32') {
    try {
        fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'));
    } catch (err) {
        // no-op
    }
}

const installDevExtensions = async() => {
    const installer = require("electron-devtools-installer");
    const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], !!process.env.UPGRADE_EXTENSIONS))
    );
};

const createMainWindow = () => {
    if (process.env.NODE_ENV !== "production") {
        installDevExtensions().catch(err => console.error(err));
    }

    win = new BrowserWindow({
        width: 1280,
        height: 920,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
        },
    });

    if (process.env.NODE_ENV !== "production") {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";

        win.loadURL(`http://localhost:55668`);

        win.webContents.once("dom-ready", () => {
            win!.webContents.openDevTools();
        });
    } else {
        win.loadURL(
            url.format({
                pathname: path.join("resources", "app.asar", "dist", "index.html"),
                protocol: "file:",
                slashes: true
            })
        );
    }

    win.on("closed", () => {
        win = null;
    });
};

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createMainWindow();
    }
});
