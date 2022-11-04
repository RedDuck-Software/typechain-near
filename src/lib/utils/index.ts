import fs from 'fs';
import glob from 'glob';

export const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

export const writeFile = (filePath: string, data: string) => {
  return fs.writeFileSync(filePath, data, 'utf-8');
};

export const getFilePathesByGlob = async (globPattern: string) => {
  console.log('Glob pattern', globPattern);
  return new Promise<string[]>((resolve, reject) => {
    glob(globPattern, { fs }, function (error: any, files: string[]) {
      if (error) reject(error);
      resolve(files);
    });
  });
};
