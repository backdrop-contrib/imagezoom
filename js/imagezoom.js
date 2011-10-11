(function($) {

  /**
   * Javascript functions for creating a zoomed image, adding it to the page on mouseover, and
   * removing it from the page on mouseout.
   */
  Drupal.behaviors.zoomimage = {
    attach: function() {
      $('a.imagezoom').mouseenter(function(e) { zoom($(this)); });
      $('a.imagezoom').mouseleave(function(e) { reset(); });
      $('a.imagezoom').mousemove(function(e) { shift(e, $(this)); });

      /**
       * Create the zoomed image, and adds it to the page.
       *
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function zoom(obj) {
        // create div to put zoomed image in
        var zoom_img_wrapper = $('<div/>', { id: 'zoom-img-wrapper' });
        // create zoomed image
        var zoom_img = $('<img/>', { src: obj.attr('href'), id: 'zoom-img' });
        // add the image wrapper div to its parent
        zoom_img_wrapper.appendTo(obj.parent());
        // add the zoomed image to the wrapper div
        zoom_img.appendTo('#zoom-img-wrapper');

        // set the parent of the wrapper div to position: relative for positioning
        $('#zoom-img-wrapper').parent('div').css('position', 'relative');
      }

      /**
       * Removes the zoomed image from the page on mouseout.
       */
      function reset() {
        $('#zoom-img-wrapper').remove();
      }

      /**
       * Shifts the zoomed image inside the wrapper relative to the current mouse position.
       *
       * @param e
       *   The jQuery eventObject.
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function shift(e, obj) {
        var image = obj.children('img');
        var zoomImage = $('#zoom-img');

        // get the current position of the mouse
        var offset = image.offset();
        var mouseX = e.pageX - offset.left;
        var mouseY = e.pageY - offset.top;

        // calculate new X and Y positions for the zoomed image
        var ratioX = (zoomImage.width() - $('#zoom-img-wrapper').width()) / image.width();
        var ratioY = (zoomImage.height() - $('#zoom-img-wrapper').height()) / image.height();
        var posX = mouseX * ratioX;
        var posY = mouseY * ratioY;

        // make sure the new X and Y positions are within the boundaries of the image
        if (posX > zoomImage.width()) {
          posX = zoomImage.width();
        }

        if (posY > zoomImage.height()) {
          posY = zoomImage.height();
        }

        // set the new X and Y positions
        $('#zoom-img').css('left', (posX * -1) + 'px');
        $('#zoom-img').css('top', (posY * -1) + 'px');
      }
    }
  }

})(jQuery);
