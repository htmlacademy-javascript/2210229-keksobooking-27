import {createrCardElement} from './card.js';

const START_COORDINATES = {
  lat: 35.66,
  lng: 139.77,
};

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: START_COORDINATES.lat,
    lng: START_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMap = () => {
  map.setView({
    lat: START_COORDINATES.lat,
    lng: START_COORDINATES.lng,
  }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainPinMarker.addTo(map);
};

const createOfferMarkers = (data) => {
  data.forEach((elem) => {
    const adMarker = L.marker(
      {
        lat: elem.location.lat,
        lng: elem.location.lng,
      },
      {
        icon: adPinIcon,
      }
    );
    adMarker.addTo(markerGroup).bindPopup(createrCardElement(elem));
  });
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const catchMainPinCoords = (cb) => {
  mainPinMarker.on('moveend', (evt) => cb(evt.target.getLatLng()));
};

const resetCoordinates = () => {
  mainPinMarker.setLatLng(START_COORDINATES);
  map.closePopup();
};

export {renderMap, catchMainPinCoords, setOnMapLoad, createOfferMarkers, resetCoordinates};
