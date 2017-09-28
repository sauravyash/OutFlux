$(window).resize(function() {
  if ($('.sidebar').width() == 300) {
    $('.viewer').css('width', 'calc(100% - 300px)')
  } else {
    $('.viewer').css('width', '75%')
  }
});
