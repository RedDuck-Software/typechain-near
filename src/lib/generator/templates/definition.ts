import { NearContractAbi } from 'lib/abis';
import { ContractTypeDefinition, getContractTypeDefinition } from './contract';
import { FunctionDefinitionBase } from './functions';
import { getImportsForDefinition } from './imports';

const _getTypeFromFunctions = (functions: FunctionDefinitionBase[]) => {
  return functions.filter((f) => f.hasArgs && f.argsType).map((f) => f.argsType?.type) as string[];
};
export const _getTypesSection = (contractDef: ContractTypeDefinition) => {
  const typesCall = _getTypeFromFunctions(contractDef.callFunctions);
  const typesView = _getTypeFromFunctions(contractDef.viewFunctions);

  // TODO: add return types from view fn`s
  const fnTypes = [...typesCall, ...typesView];

  return fnTypes.map((t) => `export ${t}`).join('\n');
};

export const getFullDefinitionFromAbi = (abi: NearContractAbi) => {
  const contractDef = getContractTypeDefinition(abi);
  const typesSection = _getTypesSection(contractDef);
  const importsSection = getImportsForDefinition();

  return [importsSection, typesSection, contractDef.contract].join('\n\n');
};
