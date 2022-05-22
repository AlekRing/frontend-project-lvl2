import { test, expect } from '@jest/globals';
import gendiff from '../index.js';
import {gendiffOutput, path1, path2} from '../__fixtures__/gendiff.fixture.js';

test('gendiff', () => {
  expect(gendiff(path1, path2)).toBe(gendiffOutput);
});
