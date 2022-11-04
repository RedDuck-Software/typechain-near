"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParserCmdArgs = void 0;
const minimist_1 = __importDefault(require("minimist"));
const validateParserCmdArguments = (args) => {
    // todo: check that only valid properties passed
    return true;
};
const getParserCmdArgs = () => {
    const parsedArgs = (0, minimist_1.default)(process.argv.slice(2));
    validateParserCmdArguments(parsedArgs);
    return parsedArgs;
};
exports.getParserCmdArgs = getParserCmdArgs;
