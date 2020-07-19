$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.parallax').parallax();

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
