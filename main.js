const apiKey = '9b2eb1e05fc74ba0b9c232350231703';

// fetch(query).then((response) => {
//     return response.json()
// }).then((data) =>{
//     console.log(data);
// })

// !Элементы на странице
const form = document.querySelector('form');
const input = document.querySelector('input');
const header = document.querySelector('header');

//! Слушаем отправку формы
form.onsubmit = function (e) {
  e.preventDefault(); //Отмена обновления страницы
  let city = input.value.trim();

  //*Делаем запрос на сервер
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //Отображаем данные в карточке
      // Удаление карточки
      //Проверка Ошибки
      if (data.error) {
        alert('Проверьте название города');
      } else {
        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();

        //Разметка для карточки
        let html = `<div class="card">
    <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
    <div class="card-weather">
      <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
      <img
        src="images/Sunny and windy.png"
        alt="weather"
        class="card-image"
        width="50%"
      />
    </div>
    <div class="card-description">${data.current.condition.text}</div>
  </div>`;

        //Отображаем карточку на странице
        header.insertAdjacentHTML('afterend', html);
      }
    });
};
