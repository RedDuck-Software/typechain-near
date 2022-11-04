import { parseAbi } from '../abis';
import { getFilePathesByGlob, readFile } from '../utils';
import { getContractTypeDefinition } from './templates/contract';
import { getFullDefinitionFromAbi } from './templates/definition';
import { getViewFunctionDefinition } from './templates/functions';

type GenerateFromAbisParams = {
  abisPath: string;
  outputFolderPath: string;
};

const readAbi = (abiPath: string) => {
  return parseAbi(readFile(abiPath));
};

const generateFromAbi = async ({ abiPath, outputFolderPath }: { abiPath: string; outputFolderPath: string }) => {
  const abi = readAbi(abiPath);

  console.log('parsedAbi', JSON.stringify(abi));

  const res = getFullDefinitionFromAbi(abi);
  console.log(res);
};

const generateFromAbis = async ({ abisPath, outputFolderPath }: GenerateFromAbisParams) => {
  const files = await getFilePathesByGlob(abisPath);
  console.log('Abis found: ', files);

  for (let file of files) {
    console.debug(`Generating From ${file} ABI`);
    await generateFromAbi({ abiPath: file, outputFolderPath });
  }
};

export = generateFromAbis;
