import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { jsonFile1 } from '../__fixtures__/gendiff.fixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('path check', () => {
  const fileName = jsonFile1;

  const isAbsolute = path.isAbsolute(fileName);
  const lastIndex = fileName.split('/').length - 1;
  const filePath = isAbsolute ? fileName.split('/')[lastIndex] : fileName;

  const final1 = path.join(__dirname, '../src/fixtures', filePath);

  expect(final1).toBe('/mnt/d/Work/hexletUserHelp/frontend-project-lvl2/src/fixtures/file1.json');
});
