import path from 'path';
import { parseAbi } from '../abis';
import { getFilePathesByGlob, readFile, writeFile } from '../utils';
import { getContractTypeDefinition } from './templates/contract';
import { getFullDefinitionFromAbi } from './templates/definition';
import { getViewFunctionDefinition } from './templates/functions';
import { generateIndexFile } from './templates/imports';

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

  return {
    fileContent: res,
    contractName: abi.contractName,
  };
};

const generateFromAbis = async ({ abisPath, outputFolderPath }: GenerateFromAbisParams) => {
  const files = await getFilePathesByGlob(abisPath);
  console.log('Abis found: ', files);

  const contracts: string[] = [];

  for (let file of files) {
    console.debug(`Generating From ${file} ABI`);
    const { fileContent, contractName } = await generateFromAbi({ abiPath: file, outputFolderPath });
    const filePath = path.join(outputFolderPath, `${contractName}.ts`);
    writeFile(filePath, fileContent);
    if (!contracts.includes(contractName)) contracts.push(contractName);
    else throw `Contract name is not unique: ${contractName}`;
  }

  const indexFileContent = generateIndexFile(contracts);

  console.log('indexFile', indexFileContent);

  writeFile(path.join(outputFolderPath, 'index.ts'), indexFileContent);
};

export = generateFromAbis;
