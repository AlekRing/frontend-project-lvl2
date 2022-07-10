import _ from 'lodash';

const genDiffTree = (data1, data2) => {
  const generalKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(generalKeys);

  const difference = sortedKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: val1 };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: val2 };
    }
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { key, type: 'nested', children: genDiffTree(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return {
        key, type: 'changed', oldValue: val1, newValue: val2,
      };
    }
    return { key, type: 'unchanged', value: val2 };
  });

  return difference;
};

export default genDiffTree;
