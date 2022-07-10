#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../index.js';

program
  .name('gendiff')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2, program.opts().format));
  })
  .parse(process.argv);
