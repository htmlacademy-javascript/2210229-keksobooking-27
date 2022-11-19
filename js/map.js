import {turnFormOff, turnFormOn} from './form.js';

turnFormOff();
turnFormOn();

const map = L.map('map-canvas').on('load', () => {
  console.log('Карта инициализирована');
}).setView({
  lat: 35.66,
  lng: 139.77,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

