import fs from 'fs';
import glob from 'glob';
import prettier from 'prettier';

export const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

export const writeFile = (filePath: string, data: string) => {
  // TODO: if folders from a file path are not exists - they should be created
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

export const prettifyCode = (code: string) => {
  return prettier.format(code, { parser: 'babel-ts', semi: false, singleQuote: true });
};
