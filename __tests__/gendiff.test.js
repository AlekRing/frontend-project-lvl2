import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../index.js';
import {
  jsonFile1, jsonFile2, yamlFile1, yamlFile2,
} from '../__fixtures__/gendiff.fixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const stylishOutput = getFixture('stylishOutput.txt');
const plainOutput = getFixture('plainOutput.txt');
const jsonOutput = getFixture('jsonOutput.json');
const plainJSON = getFixture('plainFromJSON.txt');

const getPath = (file) => path.join(__dirname, '../__fixtures__', file);

test.each([
  {
    a: yamlFile1, b: yamlFile2, style: undefined, expected: stylishOutput,
  },
  {
    a: yamlFile1, b: yamlFile2, style: 'stylish', expected: stylishOutput,
  },
  {
    a: yamlFile1, b: yamlFile2, style: 'plain', expected: plainOutput,
  },
  {
    a: jsonFile1, b: jsonFile2, style: 'plain', expected: plainJSON,
  },
  {
    a: yamlFile1, b: yamlFile2, style: 'json', expected: jsonOutput,
  },
])('gendiff each style', ({
  a, b, style, expected,
}) => {
  expect(gendiff(getPath(a), getPath(b), style)).toEqual(expected);
});
