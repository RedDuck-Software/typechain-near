import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { NearContractAbi } from '../../abis';
import { CallOverrides, CallOverridesPayable, NearContractBase } from '../../types';
import {
    CallFunctionDefinition,
    FunctionDefinitionBase,
    getCallFunctionDefinition,
    getViewFunctionDefinition,
    ViewFunctionDefinition,
} from './functions';

const _getFunctionArgs = (f: FunctionDefinitionBase) => {
    return f.hasArgs ? 'args' : '{}';
};

const _getViewFunctions = (functions: ViewFunctionDefinition[]) => {
    return functions
        .map((f) => {
            return `public ${f.signature} {
    return this.functionView<${f?.argsType?.name ?? 'object'}, ${f.returnType.name}>({
        methodName: '${f.contractMethodName}',
        args: ${_getFunctionArgs(f)}
    })
}`;
        })
        .join('\n');
};


const _getCallFunctions = (functions: CallFunctionDefinition[]) => {
    return functions
        .map((f) => {
            return `public ${f.signature} {
      return this.functionCall<${f?.argsType?.name ?? 'object'}>({
          methodName: '${f.contractMethodName}',
          overrides,
          args: ${_getFunctionArgs(f)}
      })
  }`;
        })
        .join('\n')
}

const _getContractTypeDefinition = ({
    contractName,
    byteCode,
    viewFunctions,
    callFunctions,
}: {
    contractName: string;
    byteCode?: string;
    viewFunctions: ViewFunctionDefinition[];
    callFunctions: CallFunctionDefinition[];
}) => {
    return `class ${contractName} extends ${NearContractBase.name} {
    
${_getViewFunctions(viewFunctions)}

${_getCallFunctions(callFunctions)}

}`;
};

export const getContractTypeDefinition = (abi: NearContractAbi) => {
    const preparedViewFunctions = abi.methods.view?.map(getViewFunctionDefinition) ?? [];
    const preparedCallFunctions = abi.methods.call?.map(getCallFunctionDefinition) ?? [];

    const contractName = abi.contractName;

    return _getContractTypeDefinition({
        contractName,
        viewFunctions: preparedViewFunctions,
        callFunctions: preparedCallFunctions,
    });
};
