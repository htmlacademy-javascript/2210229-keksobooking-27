const ALERT_SHOW_TIME = 5000;

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


const showAlert = (message) => {
  const alertContainerElement = document.createElement('div');

  alertContainerElement.style.zIndex = '1000';
  alertContainerElement.style.position = 'absolute';
  alertContainerElement.style.left = '0';
  alertContainerElement.style.top = '0';
  alertContainerElement.style.right = '0';
  alertContainerElement.style.padding = '11px 3px';
  alertContainerElement.style.fontSize = '30px';
  alertContainerElement.style.textAlign = 'center';
  alertContainerElement.style.backgroundColor = 'red';

  alertContainerElement.textContent = message;

  document.body.append(alertContainerElement);
  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNum, getRandomFloatNum, getRandomArrayElement, showAlert};
