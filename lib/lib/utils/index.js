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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathesByGlob = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const readFile = (filePath) => {
    return fs_1.default.readFileSync(filePath, 'utf-8');
};
exports.readFile = readFile;
const getFilePathesByGlob = (globPattern) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Glob pattern', globPattern);
    return new Promise((resolve, reject) => {
        (0, glob_1.default)(globPattern, { fs: fs_1.default }, function (error, files) {
            if (error)
                reject(error);
            resolve(files);
        });
    });
});
exports.getFilePathesByGlob = getFilePathesByGlob;
