import { readFileSync } from 'fs';
import path from 'path';
import chooseFormatter from './formatters/index.js';
import genDiffTree from './genDiffTree.js';
import parseRowData from './parsers.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const getExtension = (filePath) => path.extname(filePath)?.split('.')[0];

const genDiff = (path1, path2, format = 'stylish') => {
  const rowFile1Data = readFileSync(getPath(path1), 'utf-8');
  const rowFile2Data = readFileSync(getPath(path2), 'utf-8');

  const extensionFile1 = getExtension(path1);
  const extensionFile2 = getExtension(path2);

  const data1 = parseRowData(rowFile1Data, extensionFile1);
  const data2 = parseRowData(rowFile2Data, extensionFile2);

  const difference = genDiffTree(data1, data2);

  return chooseFormatter(format, difference);
};

export default genDiff;
