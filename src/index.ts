#!/usr/bin/env node
import { Command } from 'commander';
import { DEFAULT_ABIS_OUTPUT_PATH, DEFAULT_ABIS_PATH, DEFAULT_OUTPUT_PATH } from './constants';
import  generator from './lib/generator';
import parser from './lib/parser';

const program = new Command();

program.name('Near TypeChain utility').description('Near TypeChain utility').version('0.0.1');

program
  .command('generate')
  .description('Generates Typescript entities from a given contract ABIs')
  .option('-a, --abis <item>', 'abis blob path', DEFAULT_ABIS_PATH)
  .option('-o, --output <item>', 'generated entities output folder path', DEFAULT_OUTPUT_PATH)
  .action(({ abis, output }) => {
    return generator({ abisPath: abis, outputFolderPath: output });
  });

program
  .command('parse')
  .description('Generates ABIs from Near JavaScript contracts')
  .option('-o, --output <item>', 'abis output folder path', DEFAULT_ABIS_OUTPUT_PATH)
  .action(({ output }) => {
    return parser({ abisPath: output });
  });

program.parse();
