import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../index.js';
import genDiffTree from '../src/genDiffTree.js';
import {
  jsonFile1, jsonFile2, yamlFile1, yamlFile2,
} from '../__fixtures__/gendiff.fixture.js';
import parseRowData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const ymlOutput = readFixture('ymlOutput.txt');

const prepareData = (file) => {
  const isAbsolute = file.split('/').length > 1;
  const lastIndex = file.split('/').length - 1;
  const filePath = isAbsolute ? file.split('/')[lastIndex] : file;

  const fullPath = path.join(__dirname, '../src/fixtures', filePath);
  const rowData = fs.readFileSync(fullPath, 'utf-8');
  return parseRowData(file, rowData);
};

test('gendiff with json', () => {
  const data1 = prepareData(jsonFile1);
  const data2 = prepareData(jsonFile2);

  expect(typeof genDiffTree(data1, data2)).toBe('object');
});

test('gendiff with yaml', () => {
  // const data1 = prepareData(yamlFile1);
  // const data2 = prepareData(yamlFile2);
  expect(gendiff(yamlFile1, yamlFile2)).toEqual(ymlOutput);
});
