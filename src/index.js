import { readFileSync } from 'fs';
import path from 'path';
import stylish from './formatters/stylish.js';
import genDiffTree from './genDiffTree.js';
import parseRowData from './parsers.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const genDiff = (path1, path2, format = 'stylish') => {
  const rowFile1Data = readFileSync(getPath(path1), 'utf-8');
  const rowFile2Data = readFileSync(getPath(path2), 'utf-8');

  const data1 = parseRowData(path1, rowFile1Data);
  const data2 = parseRowData(path2, rowFile2Data);

  const difference = genDiffTree(data1, data2);

  return stylish(difference);
  // return difference;
};

export default genDiff;
