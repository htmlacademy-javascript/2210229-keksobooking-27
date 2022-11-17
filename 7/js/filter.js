const mapFilters = document.querySelector('.map__filters');
const fieldseDisabled = mapFilters.querySelector('fieldset');
const selectDisabled = mapFilters.querySelectorAll('select');

const turnOffFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  fieldseDisabled.disabled = true;
  selectDisabled.forEach((form) => {
    form.disabled = true;
  });
};

const turnOnFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  fieldseDisabled.disabled = false;
  selectDisabled.forEach((form) => {
    form.disabled = false;
  });
};

export {turnOffFilters, turnOnFilters};
