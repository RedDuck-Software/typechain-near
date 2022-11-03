import * as fs from 'fs'
import * as glob from 'glob'

export const readFile = (filePath: string) => {
    return fs.readFileSync(filePath, 'utf-8');
}

export const getFilePathesByGlob = async (globPattern: string) => {
    console.log('Glob pattern', globPattern)
    return new Promise<string[]>((resolve, reject) => {
        glob(globPattern, { fs }, function (error, files) {
            if (error) reject(error);
            resolve(files);
        })
    });
}