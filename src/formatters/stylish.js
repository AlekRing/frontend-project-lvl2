import _ from 'lodash';

const baseIdent = ' ';
const baseDepthCount = 4;
const getIdent = (depth) => baseIdent.repeat(depth * baseDepthCount - 2);

const stringify = (data, depth, types) => {
  if (!_.isObject(data)) return String(data);

  const result = Object.entries(data)
    .map(([key, value]) => types.unchanged(depth + 1, { key, value }));
  return `{\n${result.join('\n')}\n${getIdent(depth)}  }`;
};

const types = {
  nested: (depth, { key, children }) => {
    const result = children.flatMap((node) => types[node.type](depth + 1, node));
    return `${getIdent(depth)}  ${key}: {\n${result.join('\n')}\n${getIdent(depth)}  }`;
  },
  changed: (depth, { key, value1, value2 }) => {
    const data1 = `${getIdent(depth)}- ${key}: ${stringify(value1, depth, types)}`;
    const data2 = `${getIdent(depth)}+ ${key}: ${stringify(value2, depth, types)}`;

    return [data1, data2];
  },
  deleted: (depth, { key, value }) => `${getIdent(depth)}- ${key}: ${stringify(value, depth, types)}`,
  added: (depth, { key, value }) => `${getIdent(depth)}+ ${key}: ${stringify(value, depth, types)}`,
  unchanged: (depth, { key, value }) => `${getIdent(depth)}  ${key}: ${stringify(value, depth, types)}`,
};

const stylish = (data, depth = 0) => {
  const result = data.flatMap((node) => types[node.type](depth + 1, node));
  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
