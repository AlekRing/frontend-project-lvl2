import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
};

const parseRowData = (filePath, rowFileData) => {
  const extension = path.extname(filePath);

  if (!parsers[extension]) throw new Error('Invalid file extension');

  return parsers[extension](rowFileData);
};

export default parseRowData;
