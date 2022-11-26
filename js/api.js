const getData = (onSuccess, ifError) => {
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
    .catch((error) => ifError(error));
};

const sentData = (onSuccess, ifError, body) => {
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
        ifError('Не удалось отправить форму. Пожалуйста, повторите попытку');
      }
    })
    .catch(() => {
      ifError('Не удалось отправить форму. Пожалуйста, повторите попытку');
    });
};

export {getData, sentData};
