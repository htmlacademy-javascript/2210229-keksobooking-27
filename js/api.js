const getData = (onSuccess, errorHandler) => {
  fetch ('https://27.javascript.pages.academy/keksobooking/data')
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      }
      throw new Error('Ошибка загрузки данных с сервера');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => errorHandler(error));
};

const sentData = (onSuccess, errorHandler, body) => {
  fetch ('https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((Response) => {
      if(Response.ok) {
        onSuccess();
      } else {
        errorHandler('Не удалось отправить форму. Пожалуйста, повторите попытку');
      }
    })
    .catch(() => {
      errorHandler('Не удалось отправить форму. Пожалуйста, повторите попытку');
    });
};

export {getData, sentData};
