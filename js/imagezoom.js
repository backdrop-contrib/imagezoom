(function($) {

  Drupal.behaviors.zoomimage = {
    attach: function() {
      $('a.imagezoom').mouseenter(function(e) { show($(this).attr('href')); });
      $('a.imagezoom').mouseleave(function(e) { hide(); });
      $('a.imagezoom').mousemove(function(e) { move(e, $(this)); });

      // set variables
      var zoomWindowW = 600;
      var zoomWindowH = 400;
      var borderWidth = 5;
      var borderColor = '#000';
      var bgColor = '#fff';
      var zoomWindowX = 750;
      var zoomWindowY = 50;

      function show(src) {
        var zoom_img_wrapper = $('<div/>', { id: 'zoom-img-wrapper' });
        var zoom_img = $('<img/>', { src: src, id: 'zoom-img' });
        zoom_img_wrapper.appendTo('body');
        zoom_img.appendTo('#zoom-img-wrapper');

        $('#zoom-img-wrapper').css({
          'position': 'absolute',
          'top': zoomWindowY + 'px',
          'left': zoomWindowX + 'px',
          'overflow': 'hidden',
          'width': zoomWindowW + 'px',
          'height': zoomWindowH + 'px',
          'border': borderWidth + 'px solid ' + borderColor,
          'background-color': bgColor
        });

        $('#zoom-img').css({
          'position': 'absolute',
          'top': '0px',
          'left': '0px'
        });
      }

      function hide() {
        $('#zoom-img-wrapper').remove();
      }

      function move(e, obj) {
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
