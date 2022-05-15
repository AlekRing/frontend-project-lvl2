import fs from 'fs';

const sortData = (data) => {
  const dataKeys = Object.keys(data).sort((a, b) => a[0].localeCompare(b[0]));
  const sortedData = dataKeys.reduce((acc, curr) => { acc[curr] = data[curr]; return acc; }, {});

  return sortedData;
};

const concatData = (data1, data2) => {
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);

  const { larger, smaller } = dataKeys1.length > dataKeys2.length
    ? { larger: data1, smaller: data2 }
    : { larger: data2, smaller: data1 };

  const generalKeysSet = new Set([...dataKeys1, ...dataKeys2]);
  const generalKeys = Array.from(generalKeysSet);

  const concatenated = generalKeys.reduce((acc, key) => {
    const smallerDataVal = smaller[key];
    const largerDataVal = larger[key];

    const isSmallerVal = smallerDataVal !== undefined;
    const isLargerVal = largerDataVal !== undefined;

    if (isLargerVal && !isSmallerVal) {
      acc[`- ${key}`] = largerDataVal;
    } else if (isSmallerVal && !isLargerVal) {
      acc[`+ ${key}`] = smallerDataVal;
    } else if (smallerDataVal === largerDataVal) {
      acc[key] = largerDataVal;
    } else if (smallerDataVal !== largerDataVal) {
      acc[`- ${key}`] = largerDataVal;
      acc[`+ ${key}`] = smallerDataVal;
    }
    return acc;
  }, {});

  return concatenated;
};

const genDiff = (path1, path2) => {
  const rowFile1Data = fs.readFileSync(path1, 'utf-8');
  const rowFile2Data = fs.readFileSync(path2, 'utf-8');

  const data1 = JSON.parse(rowFile1Data);
  const data2 = JSON.parse(rowFile2Data);

  const concatenated = concatData(sortData(data1), sortData(data2));

  return JSON.stringify(concatenated);
  // return concatenated;
};

export default genDiff;
