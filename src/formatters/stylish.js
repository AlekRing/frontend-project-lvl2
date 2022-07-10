import _ from 'lodash';

const baseIdent = ' ';
const baseDepthCount = 4;
const getIdent = (depth) => baseIdent.repeat(depth * baseDepthCount - 2);

const stringify = (data, depth, nodeTypes) => {
  if (!_.isObject(data)) return String(data);

  const result = Object.entries(data)
    .map(([key, value]) => nodeTypes.unchanged(depth + 1, { key, value }));
  return `{\n${result.join('\n')}\n${getIdent(depth)}  }`;
};

const nodeTypes = {
  nested: (depth, { key, children }) => {
    const result = children.flatMap((node) => nodeTypes[node.type](depth + 1, node));
    return `${getIdent(depth)}  ${key}: {\n${result.join('\n')}\n${getIdent(depth)}  }`;
  },
  changed: (depth, { key, oldValue, newValue }) => {
    const data1 = `${getIdent(depth)}- ${key}: ${stringify(oldValue, depth, nodeTypes)}`;
    const data2 = `${getIdent(depth)}+ ${key}: ${stringify(newValue, depth, nodeTypes)}`;

    return [data1, data2];
  },
  deleted: (depth, { key, value }) => `${getIdent(depth)}- ${key}: ${stringify(value, depth, nodeTypes)}`,
  added: (depth, { key, value }) => `${getIdent(depth)}+ ${key}: ${stringify(value, depth, nodeTypes)}`,
  unchanged: (depth, { key, value }) => `${getIdent(depth)}  ${key}: ${stringify(value, depth, nodeTypes)}`,
};

const stylish = (data, depth = 0) => {
  const result = data.flatMap((node) => nodeTypes[node.type](depth + 1, node));
  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
