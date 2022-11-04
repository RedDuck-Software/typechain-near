"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallFunctionDefinition = exports.getViewFunctionDefinition = void 0;
const abis_1 = require("../../abis");
const uppercamelcase_1 = __importDefault(require("uppercamelcase"));
const types_1 = require("../../types");
const getTypeNameFromFunc = (name) => {
    const result = (0, uppercamelcase_1.default)(name);
    return result;
};
const getInputTypeNameFromFunc = (name) => {
    return getTypeNameFromFunc(name) + 'Input';
};
const getReturnTypeNameFromFunc = (name) => {
    return getTypeNameFromFunc(name) + 'Return';
};
const convertTypeToString = (type) => {
    if (typeof type === 'object') {
        console.log('type is object', type);
        return `{\n${Object.keys(type)
            .map((p) => {
            return `${p}: ${convertTypeToString(type[p])}`;
        })
            .join(',\n')}\n}`;
    }
    else if ((0, abis_1.isPrimitive)(type)) {
        return type;
    }
    else {
        throw 'Not supported type';
    }
};
const covertArgsToTypeString = (typeName, func) => {
    const typeBody = func.args.map((arg) => `${arg.name}: ${convertTypeToString(arg.type)}`).join(',\n');
    const fullType = `type ${typeName} {\n ${typeBody} \n}`;
    return fullType;
};
const signatureArgToString = (argTypeName) => {
    return argTypeName ? `args: ${argTypeName}` : '';
};
const getViewFunctionSignature = (fnName, argTypeName, returnTypeName) => {
    return `async ${fnName}(${signatureArgToString(argTypeName)}): Promise<${returnTypeName}>`;
};
const getCallFunctionSignature = (fnName, argTypeName, isPayable) => {
    // TODO: get FinalExecutionOutcome type name from type.name
    return `async ${fnName}(${signatureArgToString(argTypeName)}${argTypeName ? ',' : ''} overrides?: ${types_1.CallOverrides.name}${isPayable ? ` & ${types_1.CallOverridesPayable.name}` : ''}): Promise<FinalExecutionOutcome>`;
};
const getViewFunctionDefinition = (func) => {
    var _a;
    let resultTypeName;
    if (func.returnType && func.returnType !== 'void' && (0, abis_1.isPrimitive)(func.returnType))
        resultTypeName = func.returnType;
    else if (!func.returnType || func.returnType === 'void')
        resultTypeName = 'void';
    else
        resultTypeName = getReturnTypeNameFromFunc(func.name);
    const hasArgs = Boolean((_a = func === null || func === void 0 ? void 0 : func.args) === null || _a === void 0 ? void 0 : _a.length);
    const argsTypeName = hasArgs ? getInputTypeNameFromFunc(func.name) : undefined;
    const argsType = hasArgs ? covertArgsToTypeString(argsTypeName !== null && argsTypeName !== void 0 ? argsTypeName : '', func) : undefined;
    const funcSignature = getViewFunctionSignature(func.name, argsTypeName, resultTypeName);
    return {
        signature: funcSignature,
        contractMethodName: func.name,
        hasArgs,
        argsType: argsType
            ? {
                name: argsTypeName,
                type: argsType,
            }
            : undefined,
        returnType: {
            name: resultTypeName,
        },
    };
};
exports.getViewFunctionDefinition = getViewFunctionDefinition;
const getCallFunctionDefinition = (func) => {
    var _a;
    const hasArgs = Boolean((_a = func === null || func === void 0 ? void 0 : func.args) === null || _a === void 0 ? void 0 : _a.length);
    const argsTypeName = hasArgs ? getInputTypeNameFromFunc(func.name) : undefined;
    const argsType = hasArgs ? covertArgsToTypeString(argsTypeName !== null && argsTypeName !== void 0 ? argsTypeName : '', func) : undefined;
    const funcSignature = getCallFunctionSignature(func.name, argsTypeName, func.isPayable);
    return {
        isPayable: func.isPayable,
        signature: funcSignature,
        contractMethodName: func.name,
        hasArgs,
        argsType: argsType
            ? {
                name: argsTypeName,
                type: argsType,
            }
            : undefined,
    };
};
exports.getCallFunctionDefinition = getCallFunctionDefinition;
