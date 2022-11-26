import { turnFormOff, turnFormOn, setUserFormSubmit } from './form.js';
import { turnOffFilters, turnOnFilters } from './filter.js';
import { renderMap, setOnMapLoad, createOfferMarkers } from './map.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { showErrorMessage } from './modal-form.js';

const RENTAL_OBJECTS = 10;

turnFormOff();
turnOffFilters();

setOnMapLoad(() => {
  turnFormOn();
  getData((data) => {
    createOfferMarkers(data.slice(0, RENTAL_OBJECTS));
  },
  (error) => {
    showAlert(error.message);
  });
});

renderMap();
setUserFormSubmit(showErrorMessage);
turnOnFilters();
