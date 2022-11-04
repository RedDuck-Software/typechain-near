#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const constants_1 = require("./constants");
const generator_1 = __importDefault(require("./lib/generator"));
const parser_1 = __importDefault(require("./lib/parser"));
const program = new commander_1.Command();
program.name('Near TypeChain utility').description('Near TypeChain utility').version('0.0.1');
program
    .command('generate')
    .description('Generates Typescript entities from a given contract ABIs')
    .option('-a, --abis <item>', 'abis blob path', constants_1.DEFAULT_ABIS_PATH)
    .option('-o, --output <item>', 'generated entities output folder path', constants_1.DEFAULT_OUTPUT_PATH)
    .action(({ abis, output }) => {
    return (0, generator_1.default)({ abisPath: abis, outputFolderPath: output });
});
program
    .command('parse')
    .description('Generates ABIs from Near JavaScript contracts')
    .option('-o, --output <item>', 'abis output folder path', constants_1.DEFAULT_ABIS_OUTPUT_PATH)
    .action(({ output }) => {
    return (0, parser_1.default)({ abisPath: output });
});
program.parse();
