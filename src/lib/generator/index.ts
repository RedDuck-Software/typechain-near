import { parseAbi } from "../abis"
import { getFilePathesByGlob, readFile } from "../utils"

type GenerateFromAbisParams = {
    abisPath: string,
    outputFolderPath: string
}

const readAbi = (abiPath: string) => {
    return parseAbi(readFile(abiPath));
}

const generateFromAbi = async ({abiPath, outputFolderPath}: {abiPath: string, outputFolderPath: string}) =>{
    const abi = readAbi(abiPath);

    console.log(JSON.stringify(abi));
}

const generateFromAbis = async ({abisPath, outputFolderPath}: GenerateFromAbisParams) => { 
    const files = await getFilePathesByGlob(abisPath);
    console.log('Abis found: ', files);

    for (let file of files) {
        console.debug(`Generating From ${file} ABI`);
        await generateFromAbi({abiPath: file, outputFolderPath});
    }
}



export = generateFromAbis;