declare type GenerateFromAbisParams = {
    abisPath: string;
    outputFolderPath: string;
};
declare const generateFromAbis: ({ abisPath, outputFolderPath }: GenerateFromAbisParams) => Promise<void>;
export = generateFromAbis;
