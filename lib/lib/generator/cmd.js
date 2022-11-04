"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeneratorCmdArgs = void 0;
const minimist_1 = __importDefault(require("minimist"));
const validateGeneratorCmdArguments = (args) => {
    // todo: check that only valid properties passed
    return true;
};
const getGeneratorCmdArgs = () => {
    const parsedArgs = (0, minimist_1.default)(process.argv.slice(2));
    validateGeneratorCmdArguments(parsedArgs);
    return parsedArgs;
};
exports.getGeneratorCmdArgs = getGeneratorCmdArgs;
