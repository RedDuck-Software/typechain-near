import minimist from 'minimist';

export type ParserCmdArguments = {
  abisOutputPath?: string;
};

const validateParserCmdArguments = (args: object) => {
  // todo: check that only valid properties passed
  return true;
};

export const getParserCmdArgs = () => {
  const parsedArgs = minimist(process.argv.slice(2)) as ParserCmdArguments;
  validateParserCmdArguments(parsedArgs);
  return parsedArgs;
};
