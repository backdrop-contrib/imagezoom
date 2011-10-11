(function($) {

  Drupal.behaviors.zoomimage = {
    attach: function() {
      $('a.imagezoom').mouseenter(function(e) { zoom($(this)); });
      $('a.imagezoom').mouseleave(function(e) { reset(); });
      $('a.imagezoom').mousemove(function(e) { shift(e, $(this)); });

      function zoom(obj) {
        var zoom_img_wrapper = $('<div/>', { id: 'zoom-img-wrapper' });
        var zoom_img = $('<img/>', { src: obj.attr('href'), id: 'zoom-img' });
        zoom_img_wrapper.appendTo(obj.parent());
        zoom_img.appendTo('#zoom-img-wrapper');

        $('#zoom-img-wrapper').parent('div').css('position', 'relative');
      }

      function reset() {
        $('#zoom-img-wrapper').remove();
      }

      function shift(e, obj) {
        var image = obj.children('img');
        var zoomImage = $('#zoom-img');

        var offset = image.offset();
        var mouseX = e.pageX - offset.left;
        var mouseY = e.pageY - offset.top;

        var ratioX = (zoomImage.width() - $('#zoom-img-wrapper').width()) / image.width();
        var ratioY = (zoomImage.height() - $('#zoom-img-wrapper').height()) / image.height();
        var posX = mouseX * ratioX;
        var posY = mouseY * ratioY;

        if (posX > zoomImage.width()) {
          posX = zoomImage.width();
        }

        if (posY > zoomImage.height()) {
          posY = zoomImage.height();
        }

        $('#zoom-img').css('left', (posX * -1) + 'px');
        $('#zoom-img').css('top', (posY * -1) + 'px');
      }
    }
  }

})(jQuery);
