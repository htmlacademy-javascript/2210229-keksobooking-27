const AVATAR_COUNT = 10;

const TITLE = [
  'Солнечная и уютная квартира в тихом центре',
  'Сдам в аренду 2 комнатную квартиру',
  'Предлагаем в аренду на длительный срок уютную квартиру',
  'Два уровня комфорта в центре',
  'Сдам в аренду 3 комнатную квартиру',
  'Элитная квартира',
  'Квартира Премиального сегмента (180 м.кв)',
  'Квартира в уютном зелёном районе',
  'Эксклюзивная двухуровневая квартира в элитном доме',
  'Уютная квартира с прекрасным видом',
];

const PRICE = {
  MIN: 100,
  MAX: 123456,
};

const TYPES = ['palace', 'flat' , 'house', 'bungalow', 'hotel'];

const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'washer', 'conditioner', 'parking', 'elevator'];

const DESCRIPTIONS = [
  'Нужен документ, удостоверяющий личность. Постельное белье включено в цену.',
  'Уборка перед заселением. Отчетные документы.',
  'С детьми разрешено. Курение запрещено.',
  'Без посредников. Компаниям не беспокоить. БЕЗ ЖИВОТНЫХ.',
  'Бронирование без предоплаты. Быстрое заселение.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATION = {
  MIN_LAT: 35.65,
  MAX_LAT: 35.7,
  MIN_LNG: 139.7,
  MAX_LNG: 139.8,
};

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

const getRandomLat = () =>
  getRandomFloatNum (LOCATION.MIN_LAT, LOCATION.MAX_LAT, 5);

const getRandomLng = () =>
  getRandomFloatNum (LOCATION.MIN_LNG, LOCATION.MAX_LNG, 5);

const createAuthor = () => ({
  avatar: `img/avatars/user${String(getRandomNum(0, AVATAR_COUNT)).padStart(2, '0')}.png`, });

const createOffer = () => ({
  title: getRandomArrayElement(TITLE),
  address: `${getRandomLat()}, ${getRandomLng()}`,
  price: getRandomNum(PRICE.MIN, PRICE.MAX),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomNum(1, 5),
  guests: getRandomNum(1, 8),
  checkin: getRandomArrayElement(CHECK_IN_OUT),
  checkout: getRandomArrayElement(CHECK_IN_OUT),
  features: FEATURES.slice(0, getRandomNum(0, FEATURES.length)),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: Array.from({length: getRandomNum(1, PHOTOS.length)}, () => getRandomArrayElement(PHOTOS)),
});

const getRandomLocation = () => ({
  lat: getRandomLat(),
  lng: getRandomLng(),
});

const createObjects = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: getRandomLocation(),
});

const rentObjects = () => Array.from({length: AVATAR_COUNT}, createObjects);

rentObjects();
