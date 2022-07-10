import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parseRowData = (rowFileData, extension) => {
  if (!parsers[extension]) throw new Error(`Invalid file extension\nUnable to parse ${rowFileData} with extension: ${extension}.`);

  return parsers[extension](rowFileData);
};

export default parseRowData;
