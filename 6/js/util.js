const getRandomNum = (min, max) => {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) {
    return Number.NaN;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const getRandomFloatNum = (min, max, float) => {
  if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(float) || min < 0 || max < 0) {
    return Number.NaN;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  if (!Number.isInteger(float)) {
    return Number.NaN;
  }
  return +(Math.random() * (max - min) + min).toFixed(float);
};

const getRandomArrayElement = (array) =>
  array[getRandomNum(0, array.length - 1)];

export {getRandomNum, getRandomFloatNum, getRandomArrayElement};
