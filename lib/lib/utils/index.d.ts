/// <reference types="node" />
export declare const readFile: (filePath: string) => Buffer;
export declare const getFilePathesByGlob: (globPattern: string) => Promise<string[]>;
