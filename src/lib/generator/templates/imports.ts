export const getImportsForDefinition = () => {
  return `import { FinalExecutionOutcome } from "near-api-js/lib/providers"
import { CallOverrides, CallOverridesPayable, NearContract, NearContractBase } from "near-typechain"`;
};

export const generateIndexFile = (contractFileNames: string[]) => {
  return contractFileNames
    .map((contract) => {
      return `export * from './${contract}';`;
    })
    .join('\n');
};
