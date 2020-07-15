(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
      noWrap: true,
    });

    // hotfix
    document.getElementsByClassName("carousel")[0].removeAttribute('style');
    const elem =  $('.carousel.carousel-slider');
    const instance = M.Carousel.getInstance(elem);

    $('#carousel-arrow-left').on('click', function() {
      console.log('click')

      instance.prev()
    });

    $('#carousel-arrow-right').on('click', function() {
      console.log('click')

      instance.next()
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
