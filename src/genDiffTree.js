import _ from 'lodash';

const genDiffTree = (data1, data2) => {
  const generalKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(generalKeys);

  const difference = sortedKeys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];

    const isVal1 = val1 !== undefined;
    const isVal2 = val2 !== undefined;

    if (!isVal2) {
      return { key, type: 'deleted', value: val1 };
    }
    if (!isVal1) {
      return { key, type: 'added', value: val2 };
    }
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { key, type: 'nested', children: genDiffTree(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return {
        key, type: 'changed', value1: val1, value2: val2,
      };
    }
    return { key, type: 'unchanged', value: val2 };
  });

  return difference;
};

export default genDiffTree;
