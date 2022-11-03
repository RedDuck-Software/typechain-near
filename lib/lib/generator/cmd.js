"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeneratorCmdArgs = void 0;
var minimist = require("minimist");
var validateGeneratorCmdArguments = function (args) {
    // todo: check that only valid properties passed
    return true;
};
var getGeneratorCmdArgs = function () {
    var parsedArgs = minimist(process.argv.slice(2));
    validateGeneratorCmdArguments(parsedArgs);
    return parsedArgs;
};
exports.getGeneratorCmdArgs = getGeneratorCmdArgs;
