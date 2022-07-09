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
const getFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const ymlOutput = getFixture('ymlOutput.txt');
const plainOutput = getFixture('plainOutput.txt');
const jsonOutput = getFixture('jsonOutput.json');

const prepareData = (file) => {
  const isAbsolute = file.split('/').length > 1;
  const lastIndex = file.split('/').length - 1;
  const filePath = isAbsolute ? file.split('/')[lastIndex] : file;

  const fullPath = path.join(__dirname, '../__fixtures__', filePath);
  const rowData = fs.readFileSync(fullPath, 'utf-8');
  return parseRowData(file, rowData);
};

test('gendiffTree type', () => {
  const data1 = prepareData(jsonFile1);
  const data2 = prepareData(jsonFile2);

  expect(typeof genDiffTree(data1, data2)).toBe('object');
});

test('gendiff with yaml', () => {
  expect(gendiff(yamlFile1, yamlFile2)).toEqual(ymlOutput);
});

test('gendiff plain', () => {
  expect(gendiff(jsonFile1, jsonFile2, 'plain')).toEqual(plainOutput);
});

test('gendiff json', () => {
  expect(gendiff(yamlFile1, yamlFile2, 'json')).toEqual(jsonOutput);
});
