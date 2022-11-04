"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAbi = exports.isPrimitive = void 0;
const isPrimitive = (type) => {
    if (typeof 0 === type || typeof '' === type || typeof false === type)
        return true;
    return false;
};
exports.isPrimitive = isPrimitive;
const parseAbi = (abiJson) => {
    return JSON.parse(abiJson);
};
exports.parseAbi = parseAbi;
