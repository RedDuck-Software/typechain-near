"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractTypeDefinition = void 0;
const types_1 = require("../../types");
const functions_1 = require("./functions");
const _getFunctionArgs = (f) => {
    return f.hasArgs ? 'args' : '{}';
};
const _getViewFunctions = (functions) => {
    return functions
        .map((f) => {
        var _a, _b;
        return `public ${f.signature} {
    return this.functionView<${(_b = (_a = f === null || f === void 0 ? void 0 : f.argsType) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'object'}, ${f.returnType.name}>({
        methodName: '${f.contractMethodName}',
        args: ${_getFunctionArgs(f)}
    })
}`;
    })
        .join('\n');
};
const _getCallFunctions = (functions) => {
    return functions
        .map((f) => {
        var _a, _b;
        return `public ${f.signature} {
      return this.functionCall<${(_b = (_a = f === null || f === void 0 ? void 0 : f.argsType) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'object'}>({
          methodName: '${f.contractMethodName}',
          overrides,
          args: ${_getFunctionArgs(f)}
      })
  }`;
    })
        .join('\n');
};
const _getContractTypeDefinition = ({ contractName, byteCode, viewFunctions, callFunctions, }) => {
    return `class ${contractName} extends ${types_1.NearContractBase.name} {
    
${_getViewFunctions(viewFunctions)}

${_getCallFunctions(callFunctions)}

}`;
};
const getContractTypeDefinition = (abi) => {
    var _a, _b, _c, _d;
    const preparedViewFunctions = (_b = (_a = abi.methods.view) === null || _a === void 0 ? void 0 : _a.map(functions_1.getViewFunctionDefinition)) !== null && _b !== void 0 ? _b : [];
    const preparedCallFunctions = (_d = (_c = abi.methods.call) === null || _c === void 0 ? void 0 : _c.map(functions_1.getCallFunctionDefinition)) !== null && _d !== void 0 ? _d : [];
    const contractName = abi.contractName;
    return _getContractTypeDefinition({
        contractName,
        viewFunctions: preparedViewFunctions,
        callFunctions: preparedCallFunctions,
    });
};
exports.getContractTypeDefinition = getContractTypeDefinition;
