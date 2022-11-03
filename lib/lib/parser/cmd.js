"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParserCmdArgs = void 0;
var minimist = require("minimist");
var validateParserCmdArguments = function (args) {
    // todo: check that only valid properties passed
    return true;
};
var getParserCmdArgs = function () {
    var parsedArgs = minimist(process.argv.slice(2));
    validateParserCmdArguments(parsedArgs);
    return parsedArgs;
};
exports.getParserCmdArgs = getParserCmdArgs;
