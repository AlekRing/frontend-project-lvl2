import fs from 'fs';

const sortByAlphabeticalOrder = (a, b) => a[0].localeCompare(b[0]);

const genDifference = (data1, data2) => {
  const sortedKeys1 = Object.keys(data1).sort(sortByAlphabeticalOrder);
  const sortedKeys2 = Object.keys(data2).sort(sortByAlphabeticalOrder);

  const generalKeys = [...new Set([...sortedKeys1, ...sortedKeys2])];

  const { larger, smaller } = sortedKeys1.length > sortedKeys2.length
    ? { larger: data1, smaller: data2 }
    : { larger: data2, smaller: data1 };

  const difference = generalKeys.reduce((acc, key) => {
    const smallerValue = smaller[key];
    const largerValue = larger[key];

    const isSmallerVal = smallerValue !== undefined;
    const isLargerVal = largerValue !== undefined;

    if (isLargerVal && !isSmallerVal) {
      acc[`- ${key}`] = largerValue;
    } else if (isSmallerVal && !isLargerVal) {
      acc[`+ ${key}`] = smallerValue;
    } else if (smallerValue === largerValue) {
      acc[key] = largerValue;
    } else if (smallerValue !== largerValue) {
      acc[`- ${key}`] = largerValue;
      acc[`+ ${key}`] = smallerValue;
    }
    return acc;
  }, {});

  return difference;
};

const main = (path1, path2) => {
  const rowFile1Data = fs.readFileSync(path1, 'utf-8');
  const rowFile2Data = fs.readFileSync(path2, 'utf-8');

  const data1 = JSON.parse(rowFile1Data);
  const data2 = JSON.parse(rowFile2Data);

  const difference = genDifference(data1, data2);

  return JSON.stringify(difference);
  // return difference;
};

export default main;
