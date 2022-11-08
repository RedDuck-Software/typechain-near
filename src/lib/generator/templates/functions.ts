import { ComplexType, isPrimitive, NearFunctionCall, NearFunctionView, PrimitiveType } from '../../abis';
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

const convertTypeToString = (type: PrimitiveType | ComplexType): string => {
  if (typeof type === 'object') {
    return `{\n${Object.keys(type)
      .map((p) => {
        return `${p}: ${convertTypeToString((type as ComplexType)[p])}`;
      })
      .join(',\n')}\n}`;
  } else if (isPrimitive(type)) {
    return type as string;
  } else {
    throw 'Not supported type';
  }
};

const covertArgsToTypeString = (typeName: string, func: NearFunctionView) => {
  const typeBody = func.args.map((arg) => `${arg.name}: ${convertTypeToString(arg.type)}`).join(',\n');
  const fullType = `type ${typeName} = {\n ${typeBody} \n}`;
  return fullType;
};

const covertReturnTypeToTypeString = (typeName: string, typeBodyString: string) => {
  const fullType = `type ${typeName} = ${typeBodyString}`;
  return fullType;
};

const signatureArgToString = (argTypeName: string | undefined) => {
  return argTypeName ? `args: ${argTypeName}` : '';
};

const getViewFunctionSignature = (fnName: string, argTypeName: string | undefined, returnTypeName: string, returnIsArray: boolean) => {
  return `async ${fnName}(${signatureArgToString(argTypeName)}): Promise<${returnTypeName}${returnIsArray && returnTypeName !== 'void' ? '[]' : ''}>`;
};

const getCallFunctionSignature = (fnName: string, argTypeName: string | undefined, isPayable: boolean) => {
  // TODO: get FinalExecutionOutcome type name from type.name
  return `async ${fnName}(${signatureArgToString(argTypeName)}${argTypeName ? ',' : ''} overrides?: ${CallOverrides.name
    }${isPayable ? ` & ${CallOverridesPayable.name}` : ''}): Promise<FinalExecutionOutcome>`;
};

export const getViewFunctionDefinition = (func: NearFunctionView): ViewFunctionDefinition => {
  let resultTypeName: string;

  if (func.returnType && func.returnType?.type !== 'void' && isPrimitive(func.returnType?.type))
    resultTypeName = func.returnType?.type as string;
  else if (!func.returnType || func.returnType?.type === 'void') resultTypeName = 'void';
  else resultTypeName = getReturnTypeNameFromFunc(func.name);

  const hasArgs = Boolean(func?.args?.length);
  const argsTypeName = hasArgs ? getInputTypeNameFromFunc(func.name) : undefined;

  const argsType = hasArgs ? covertArgsToTypeString(argsTypeName ?? '', func) : undefined;
  const funcSignature = getViewFunctionSignature(func.name, argsTypeName, resultTypeName, func.returnType?.isArray ?? false);

  const returnType = func?.returnType?.type && !isPrimitive(func?.returnType?.type) ? covertReturnTypeToTypeString(resultTypeName, convertTypeToString(func?.returnType?.type)) : undefined;

  console.log(returnType);
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
  const hasArgs = Boolean(func?.args?.length);

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
