const CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');

const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const removeFeatures = (element, features) => {
  const featuresTemplateData = element.querySelector('.popup__features');
  const featuresList = featuresTemplateData.querySelectorAll('.popup__feature');

  if (features && features.length) {
    featuresList.forEach((li) => {
      const isNeeded = features.some(
        (feature) => li.classList.contains(`popup__feature--${feature}`),);
      if (!isNeeded) {
        li.remove();
      }
    });
  } else {
    featuresTemplateData.remove();
  }
};

const displayDescriptions = (element, description) => {
  const descriptionData = element.querySelector('.popup__description');

  if (description && description.length) {
    descriptionData.textContent = description;
  } else {
    descriptionData.remove();
  }
};

const createPhoto = (title, photo) => {
  const photoTemplateElement = document.createElement('img');
  photoTemplateElement.classList.add('popup__photo');
  photoTemplateElement.src = photo;
  photoTemplateElement.alt = title;
  photoTemplateElement.width = '45';
  photoTemplateElement.height = '40';

  return photoTemplateElement;
};

const renderPhotos = (offerElements, title, photos) => {
  const photoList = offerElements.querySelector('.popup__photos');
  photoList.innerHTML = '';
  photos.forEach((photo) => {
    const photoElement = createPhoto(title, photo);
    photoList.append(photoElement);
  });
};

export const createrCardElement = ({ author, offer }) => {
  const offerElements = CARD_TEMPLATE.cloneNode(true);
  offerElements.querySelector('.popup__title').textContent = offer.title;
  offerElements.querySelector('.popup__text--address').textContent = offer.address;
  offerElements.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElements.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[offer.type];
  offerElements.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerElements.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerElements.querySelector('.popup__description').textContent = offer.description;
  offerElements.querySelector('.popup__avatar').src = author.avatar;

  displayDescriptions(offerElements, offer.description);
  removeFeatures(offerElements, offer.features);
  renderPhotos(offerElements, offer.title, offer.photos);

  return offerElements;
};
