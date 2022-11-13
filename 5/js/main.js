import {rentObjects} from './data.js';
import {createrCardElement} from './card.js';

const MAP_ELEMENT = document.querySelector('#map-canvas');
const OBJECT_DATA = rentObjects();

createrCardElement(MAP_ELEMENT, OBJECT_DATA[0]);
