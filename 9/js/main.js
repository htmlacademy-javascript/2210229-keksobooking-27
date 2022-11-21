import {rentObjects} from './data.js';
import {turnFormOff, turnFormOn} from './form.js';
import {turnOffFilters, turnOnFilters} from './filter.js';
import {renderMap, setOnMapLoad, createOfferMarkers} from './map.js';

const OBJECT_DATA = rentObjects();


turnOffFilters();

setOnMapLoad(() => {
  createOfferMarkers(OBJECT_DATA);
  turnFormOn();
});

renderMap();
