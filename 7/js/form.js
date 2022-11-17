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

const adFormElement = document.querySelector('.ad-form');
const fieldsetElements = adFormElement.querySelectorAll('fieldset');
const numberOfRooms = adFormElement.querySelector('#room_number');
const numberOfGuests = adFormElement.querySelector('#capacity');

const pristine = new Pristine(
  adFormElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);

const compareValues = () =>
  ROOMS[numberOfRooms.value].includes(numberOfGuests.value);

const getErrorRooms = () =>
  `Для указанного количества гостей нужно ${GUESTS[numberOfGuests.value]} комнат`;

const getErrorGuests = () =>
  `Указанное количество комнат вмещает ${ROOMS[numberOfRooms.value]} человек`;

const checkRoomsChanges = () => {
  pristine.validate(numberOfGuests);
  pristine.validate(numberOfRooms);
};

const checkGuestsChanges = () => {
  pristine.validate(numberOfGuests);
  pristine.validate(numberOfRooms);
};

numberOfRooms.addEventListener('change', checkRoomsChanges);
numberOfGuests.addEventListener('change', checkGuestsChanges);

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

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isTrue = pristine.validate();

  if (isTrue) {
    console.log('Ooke');
  } else {
    console.log(pristine.getErrors());
  }
});

export {turnOffForm, turnOnForm};
