import _ from 'lodash';

const stringify = (value) => {
  if (_.isNull(value)) return value;
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return String(value);
};

const getPropPath = (path, key) => (path === '' ? `${key}` : `${path}.${key}`);

const types = {
  nested: ({ key, children }, path, plain) => plain(children, getPropPath(path, key)),
  changed: ({ key, oldValue, newValue }, path) => `Property '${getPropPath(path, key)}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  deleted: ({ key }, path) => `Property '${getPropPath(path, key)}' was removed`,
  added: ({ key, value }, path) => `Property '${getPropPath(path, key)}' was added with value: ${stringify(value)}`,
  unchanged: () => [],
};

const plain = (data, path = '') => {
  const result = data.flatMap((node) => (node.type === 'nested' ? types[node.type]?.(node, path, plain) : types[node.type]?.(node, path)));

  return result.join('\n');
};

export default plain;
