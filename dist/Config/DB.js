"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfig = void 0;
const mongoose_1 = require("mongoose");
const environConfig_1 = require("./environConfig");
const DbConfig = () => {
    (0, mongoose_1.connect)(environConfig_1.envConfig.MONGODB).then(() => {
        console.log(`Server and Database is connected`);
    });
};
exports.DbConfig = DbConfig;
