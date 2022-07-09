import { readFileSync } from 'fs';
import path from 'path';
import chooseFormatter from './formatters/index.js';
import genDiffTree from './genDiffTree.js';
import parseRowData from './parsers.js';

const getPath = (filename) => {
  const pathToFixtures = `${process.cwd()}/__fixtures__`;
  return path.resolve(pathToFixtures, filename);
};

const genDiff = (path1, path2, format = 'stylish') => {
  const rowFile1Data = readFileSync(getPath(path1), 'utf-8');
  const rowFile2Data = readFileSync(getPath(path2), 'utf-8');

  const data1 = parseRowData(path1, rowFile1Data);
  const data2 = parseRowData(path2, rowFile2Data);

  const difference = genDiffTree(data1, data2);

  return chooseFormatter(format, difference);
};

export default genDiff;
