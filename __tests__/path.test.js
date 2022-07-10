import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { jsonFile1 } from '../__fixtures__/gendiff.fixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('path check', () => {
  const finalPath = path.join(__dirname, '__fixtures__', jsonFile1);

  console.log(__dirname, finalPath);

  expect(finalPath).toBe('/mnt/d/Work/hexletUserHelp/frontend-project-lvl2/__fixtures__/file1.json');
});
