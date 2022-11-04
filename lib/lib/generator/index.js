"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const abis_1 = require("../abis");
const utils_1 = require("../utils");
const contract_1 = require("./templates/contract");
const readAbi = (abiPath) => {
    return (0, abis_1.parseAbi)((0, utils_1.readFile)(abiPath));
};
const generateFromAbi = ({ abiPath, outputFolderPath }) => __awaiter(void 0, void 0, void 0, function* () {
    const abi = readAbi(abiPath);
    console.log('parsedAbi', JSON.stringify(abi));
    const res = (0, contract_1.getContractTypeDefinition)(abi);
    console.log(res);
});
const generateFromAbis = ({ abisPath, outputFolderPath }) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, utils_1.getFilePathesByGlob)(abisPath);
    console.log('Abis found: ', files);
    for (let file of files) {
        console.debug(`Generating From ${file} ABI`);
        yield generateFromAbi({ abiPath: file, outputFolderPath });
    }
});
module.exports = generateFromAbis;
