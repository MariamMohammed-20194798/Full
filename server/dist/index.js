"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
// ###########################################################
// Socket IO server
const server = http_1.default.createServer(app_1.default);
// DATABASE CONNECTION
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB).then(() => console.log("DB Connection Successful!"));
//SERVER RUNNING
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`APP RUNNING ON PORT ${port}...`);
});
