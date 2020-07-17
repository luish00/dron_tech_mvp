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

  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);
  }

  // autoplay()
});
