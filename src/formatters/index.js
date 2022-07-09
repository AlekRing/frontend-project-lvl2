import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

const chooseFormatter = (format, diff) => formatters[format](diff);

export default chooseFormatter;
