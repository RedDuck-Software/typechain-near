import minimist from 'minimist';

export type GeneratorCmdArguments = {
  abisPath?: string;
  outputPath?: string;
};

const validateGeneratorCmdArguments = (args: object) => {
  // todo: check that only valid properties passed
  return true;
};

export const getGeneratorCmdArgs = () => {
  const parsedArgs = minimist(process.argv.slice(2)) as GeneratorCmdArguments;
  validateGeneratorCmdArguments(parsedArgs);
  return parsedArgs;
};
