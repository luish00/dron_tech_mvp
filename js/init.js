let townsData;

function currencyFormat(value) {
  if (value === 0) {
    return `${value.toFixed(2)}`;
  }

  const formattedValue = `${Math.abs(value)
    .toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

  return formattedValue;
}

function serializeForUri(obj = {}) {
  return Object
    .keys(obj)
    .map((key) => `${encodeURI(key)}=${encodeURI(obj[key])}`)
    .join('&');
}

function testOnlyNumber(value) {
  const REGEX_NUMBER = /^[0-9]*$/;

  return REGEX_NUMBER.test(value) || !value;
}

function filterNumber(value = '') {
  const matches = value.match(/\d/g) || [];
  return matches.join('');
}

async function getTowns() {
  const request = await fetch('http://localhost:8080/town');

  if (request.ok) {
    const response = await request.json();
    const { statusCode, data } = response;

    if (statusCode === 200 && data) {
      townsData = data;

      fillSelectTown();
    }
  }
}

async function getQuote(body) {
  const paams = serializeForUri(body);
  const request =
    await fetch(`http://localhost:8080/prices?${paams}`);

  if (request.ok) {
    const response = await request.json();
    const { statusCode, data } = response;

    if (statusCode === 200 && data) {
      $('#lastQutoe span').remove();
      $('#lastQutoe').append(`<span class="center col m12">$${currencyFormat(data)}</span>`)
    }
  }

  $('#quoteProgress').addClass('gone');
  $('#btnGetQuote').removeClass('disabled');
}

function fillSelectTown() {
  const cityId = $('#slCity').val();
  const data = townsData.filter(item => item.cityId == cityId);

  $('#slTown option').remove();
  $('#slTown').append('<option value="" disabled selected>Selecciona...</option>');

  data.forEach(({ id, name }, index) => {
    $('#slTown').append(`<option ${index === 1 && 'selected'} value="${id}">${name}</option>`);
  });

  $('select').formSelect();
}

function setEvents() {
  $('#slCity').on('change', function (event) {
    fillSelectTown();
  });

  $('#hectareas').on('input', function (event) {
    const { value } = event.target;

    if (!testOnlyNumber(value)) {
      $('#hectareas').val(filterNumber(value));
    }
  });

  $('#phone').on('input', function (event) {
    const { value } = event.target;

    if (!testOnlyNumber(value)) {
      $('#phone').val(filterNumber(value));
    }
  });

  $('form#quoteForm').on('submit', function (event) {
    event.preventDefault();

    $('#quoteProgress').removeClass('gone');
    $('#btnGetQuote').addClass('disabled');

    const townId = $('#slTown').val();
    const town = townsData.find(item => item.id === parseInt(townId));

    const body = {
      cityId: town.cityId,
      hectareas: $('#hectareas').val(),
      name: $('#name').val(),
      phone: $('#phone').val(),
      sectorId: $('#slSector').val(),
      townId: $('#slTown').val(),
    }

    getQuote(body);
  })
}

$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.parallax').parallax();
  $('select').formSelect();

  getTowns();
  setEvents();

  $('.carousel.carousel-slider').carousel({
    dist: 0,
    padding: 0,
    fullWidth: true,
    indicators: true,
    duration: 100,
  });


  $('#carousel-arrow-left').on('click', function () {
    $('.carousel').carousel('prev');
  });

  $('#carousel-arrow-right').on('click', function () {
    $('.carousel').carousel('next');
  });

  // play caroucel comment
  function carouelAutoplay() {
    $('.carousel').carousel('next');
    setTimeout(carouelAutoplay, 4500);
  }

  // docs https://leafletjs.com/reference-1.6.0.html
  function initMap() {
    var map = L.map('map', {
      closePopupOnClick: false,
      dragging: true,
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
    }).setView([24.823160, -107.407402], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([24.823160, -107.407402]).addTo(map)
      .bindPopup('Av. Zircon 2140 Desarrollo Urbano tres ríos CP 80020 Culiacán Sinaloa.'
        + `<a href="https://www.google.com/maps/dir/?api=1&amp;destination=
      Av.%20Zircon%202140%20Desarrollo%20Urbano%20tres%20r%C3%ADos%20CP%208
      0020%20Culiac%C3%A1n%20Sinaloa" target="_blank">Direcciones</a>`
      ).openPopup();
  }

  carouelAutoplay();
  initMap();
});
