import { isPrimitive, NearFunctionArg, NearFunctionCall, NearFunctionType, NearFunctionView, PrimitiveType } from '../../abis';
import camelCase from 'uppercamelcase';
import { CallOverrides, CallOverridesPayable, NearContract } from '../../types';

type StringType = {
  isArray?: boolean, // TODO: temp solution, should add fully functional array type parsing
  name: string; // just a type name, like `SomeType`
  type: string; // type in string format, like `type SomeType = {...}`
};

export type FunctionDefinitionBase = {
  signature: string;
  contractMethodName: string;
  argsType?: StringType;
  hasArgs: boolean;
};

export type ViewFunctionDefinition = {
  returnType: {
    name: string;
    isArray?: boolean,
    type?: string; // optional, because return type can be simple, like `boolean`
  };
} & FunctionDefinitionBase;

export type CallFunctionDefinition = {
  isPayable: boolean;
} & FunctionDefinitionBase;

const getTypeNameFromFunc = (name: string) => {
  const result = camelCase(name);
  return result;
};

const getInputTypeNameFromFunc = (name: string) => {
  return getTypeNameFromFunc(name) + 'Input';
};

const getReturnTypeNameFromFunc = (name: string) => {
  return getTypeNameFromFunc(name) + 'Return';
};

const convertTypeToString = (type: NearFunctionArg | NearFunctionType | PrimitiveType): string => {
  if (isPrimitive(type as PrimitiveType))
    return type as string;
  else if (isPrimitive((type as NearFunctionType)?.type)) {
    return (type as NearFunctionType).type as string;
  } else if (typeof type === 'object' && (type as NearFunctionType).type) {
    return convertTypeToString(type.type);
  } else if (typeof type === 'object') {
    return `{\n${Object.entries(type)
      .map(([p, _value]) => {
        const value = _value as NearFunctionType
        return `${p}: ${convertTypeToString(value.type)}${value.isArray ? '[]' : ''}`;
      })
      .join(',\n')}\n}`;
  } else {
    throw 'Not supported type';
  }
};
const covertArgsToTypeString = (typeName: string, func: NearFunctionView) => {
  const typeBody = convertTypeToString(func.args);
  const fullType = `type ${typeName} = ${typeBody}`;
  return fullType;
};

const covertReturnTypeToTypeString = (typeName: string, func: NearFunctionView) => {
  if(!func.returnType) throw 'Invalid return type';

  const fullType = `type ${typeName} = ${convertTypeToString(func.returnType)}`;
  return fullType;
};

const signatureArgToString = (argTypeName: string | undefined) => {
  return argTypeName ? `args: ${argTypeName}` : '';
};

const getViewFunctionSignature = (fnName: string, argTypeName: string | undefined, returnTypeName: string, returnIsArray: boolean) => {
  return `async ${fnName}(${signatureArgToString(argTypeName)}): Promise<${returnTypeName}${returnIsArray && returnTypeName !== 'void' ? '[]' : ''}>`;
};

const getCallFunctionSignature = (fnName: string, argTypeName: string | undefined, isPayable: boolean) => {
  return `async ${fnName}(${signatureArgToString(argTypeName)}${argTypeName ? ',' : ''} overrides?: ${CallOverrides.name
    }${isPayable ? ` & ${CallOverridesPayable.name}` : ''}): Promise<FinalExecutionOutcome>`;
};

export const getViewFunctionDefinition = (func: NearFunctionView): ViewFunctionDefinition => {
  let resultTypeName: string;
  
  if(func?.returnType?.type) {
    if(isPrimitive(func?.returnType?.type)) 
      resultTypeName = func?.returnType?.type as string;
    else
      resultTypeName = getReturnTypeNameFromFunc(func.name);
  }
  else resultTypeName = 'unknown';

  const hasArgs = Boolean(Object.keys(func.args?.type ?? {})?.length);
  const argsTypeName = hasArgs ? getInputTypeNameFromFunc(func.name) : undefined;

  const argsType = hasArgs ? covertArgsToTypeString(argsTypeName ?? '', func) : undefined;
  const funcSignature = getViewFunctionSignature(func.name, argsTypeName, resultTypeName, func.returnType?.isArray ?? false);

  const returnType = isPrimitive(resultTypeName as PrimitiveType) ? undefined : covertReturnTypeToTypeString(resultTypeName, func); 

  return {
    signature: funcSignature,
    contractMethodName: func.name,
    hasArgs,
    argsType: argsType
      ? {
        name: argsTypeName as string,
        type: argsType as string,
      }
      : undefined,
    returnType: {
      name: resultTypeName,
      type: returnType,
      isArray: func.returnType?.isArray ?? false
    },
  };
};

export const getCallFunctionDefinition = (func: NearFunctionCall): CallFunctionDefinition => {
  const hasArgs = Boolean(Object.keys(func.args?.type ?? {})?.length);

  const argsTypeName = hasArgs ? getInputTypeNameFromFunc(func.name) : undefined;
  const argsType = hasArgs ? covertArgsToTypeString(argsTypeName ?? '', func) : undefined;
  const funcSignature = getCallFunctionSignature(func.name, argsTypeName, func.isPayable);

  return {
    isPayable: func.isPayable,
    signature: funcSignature,
    contractMethodName: func.name,
    hasArgs,
    argsType: argsType
      ? {
        name: argsTypeName as string,
        type: argsType as string,
      }
      : undefined,
  };
};
