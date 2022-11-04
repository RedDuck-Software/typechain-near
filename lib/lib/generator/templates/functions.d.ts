import { NearFunctionCall, NearFunctionView } from '../../abis';
declare type StringType = {
    name: string;
    type: string;
};
export declare type FunctionDefinitionBase = {
    signature: string;
    contractMethodName: string;
    argsType?: StringType;
    hasArgs: boolean;
};
export declare type ViewFunctionDefinition = {
    returnType: {
        name: string;
        type?: string;
    };
} & FunctionDefinitionBase;
export declare type CallFunctionDefinition = {
    isPayable: boolean;
} & FunctionDefinitionBase;
export declare const getViewFunctionDefinition: (func: NearFunctionView) => ViewFunctionDefinition;
export declare const getCallFunctionDefinition: (func: NearFunctionCall) => CallFunctionDefinition;
export {};
