const ROOMS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const GUESTS = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

const MIN_RENT_COST = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};


const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const numberOfRooms = adFormElement.querySelector('#room_number');
const numberOfGuests = adFormElement.querySelector('#capacity');
const fieldInputPrice = adFormElement.querySelector('#price');
const typeOfRend = adFormElement.querySelector('#type');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');

const pristine = new Pristine(
  adFormElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);


const changeRentPrice = () => {
  fieldInputPrice.placeholder = MIN_RENT_COST[typeOfRend.value];
  fieldInputPrice.min = MIN_RENT_COST[typeOfRend.value];
  return +fieldInputPrice.value >= +fieldInputPrice.min;
};

const compareValues = () =>
  ROOMS[numberOfRooms.value].includes(numberOfGuests.value);

const getErrorRooms = () =>
  `Для указанного количества гостей нужно ${GUESTS[numberOfGuests.value]} комнат`;

const getErrorGuests = () =>
  `Указанное количество комнат вмещает ${ROOMS[numberOfRooms.value]} человек`;

const getErrorPrice = () =>
  `Минимальная сумма составляет ${fieldInputPrice.min} руб.`;

const checkRoomsChanges = () => {
  pristine.validate(numberOfGuests);
  pristine.validate(numberOfRooms);
};

const checkGuestsChanges = () => {
  pristine.validate(numberOfGuests);
  pristine.validate(numberOfRooms);
};

const checkPriceChanges = () => {
  pristine.validate(fieldInputPrice);
};


numberOfRooms.addEventListener('change', checkRoomsChanges);
numberOfGuests.addEventListener('change', checkGuestsChanges);
timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});
timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});
typeOfRend.addEventListener('change', () => {
  changeRentPrice();
  checkPriceChanges();
});


const turnOffForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((form) => {
    form.disabled = true;
  });
};

const turnOnForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach((form) => {
    form.disabled = false;
  });
};

pristine.addValidator(numberOfRooms, compareValues, getErrorRooms);
pristine.addValidator(numberOfGuests, compareValues, getErrorGuests);
pristine.addValidator(fieldInputPrice, changeRentPrice, getErrorPrice);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    pristine.getErrors();
  }
});

export {turnOffForm, turnOnForm};
