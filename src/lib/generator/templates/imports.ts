export const generateIndexFile = (contractFileNames: string[]) => {
  return contractFileNames
    .map((contract) => {
      return `export * from './${contract}';`;
    })
    .join('\n');
};
