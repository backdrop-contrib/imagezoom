(function($) {

  /**
   * Javascript functions for creating a zoomed image, adding it to the page on 
   * mouseover, and removing it from the page on mouseout.
   */
  Drupal.behaviors.zoomimage = {
    attach: function() {
      $('a.imagezoom').mouseenter(function(e) { zoom($(this)); });
      $('a.imagezoom').mouseleave(function(e) { reset(); });
      $('a.imagezoom').mousemove(function(e) { shift(e, $(this)); });
      $('a.imagezoom').click(function(e) { e.preventDefault(); });
      $('a.imagezoom-thumb-image').click(function(e) { swap(e, $(this)); });

      /**
       * Create the zoomed image, and adds it to the page.
       *
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function zoom(obj) {
        var zoom_img_wrapper, zoom_img;

        // create div to put zoomed image in
        zoom_img_wrapper = $('<div/>', { id: 'zoom-img-wrapper' });
        // create zoomed image
        zoom_img = $('<img/>', { src: obj.attr('href'), id: 'zoom-img' });
        // add the image wrapper div to its parent
        zoom_img_wrapper.appendTo(obj.parent());
        // add the zoomed image to the wrapper div
        zoom_img.appendTo('#zoom-img-wrapper');

        // set the parent of the wrapper div to relative positioning.
        $('#zoom-img-wrapper').parent('div').css('position', 'relative');
      }

      /**
       * Removes the zoomed image from the page on mouseout.
       */
      function reset() {
        $('#zoom-img-wrapper').remove();
      }

      /**
       * Shifts the zoomed image inside the wrapper relative to the current 
       * mouse position.
       *
       * @param e
       *   The jQuery eventObject.
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function shift(e, obj) {
        var image, zoomImage, offset, mouseX, mouseY, ratioX, ratioY, posX, posY;

        image = obj.children('img');
        zoomImage = $('#zoom-img');

        // get the current position of the mouse
        offset = image.offset();
        mouseX = e.pageX - offset.left;
        mouseY = e.pageY - offset.top;

        // calculate new X and Y positions for the zoomed image
        ratioX = (zoomImage.width() - $('#zoom-img-wrapper').width()) / image.width();
        ratioY = (zoomImage.height() - $('#zoom-img-wrapper').height()) / image.height();
        posX = mouseX * ratioX;
        posY = mouseY * ratioY;

        // make sure the new X and Y positions are within the boundaries 
        // of the image
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

      /**
       * Swaps thumbnails with the main image.
       *
       * @param e
       *   The jQuery eventObject.
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function swap(e, obj) {
        e.preventDefault();

        var mainSrc, zoomSrc, thumbSrc, newMainSrc, newZoomSrc, pos;

        // get the base path for the main image
        mainSrc = $('a.imagezoom img').attr('src');
        pos = mainSrc.lastIndexOf('/');
        mainSrc = mainSrc.substr(0, pos) + '/';

        // get the base path for the zoomed image
        zoomSrc = $('a.imagezoom').attr('href');
        pos = zoomSrc.lastIndexOf('/');
        zoomSrc = zoomSrc.substr(0, pos) + '/';

        // get the filename of the click thumbnail
        thumbSrc = obj.children('img').attr('src');
        pos = thumbSrc.lastIndexOf('/');
        thumbSrc = thumbSrc.substr(pos + 1);

        // create new source paths
        newMainSrc = mainSrc + thumbSrc;
        newZoomSrc = zoomSrc + thumbSrc;

        // swap sources
        $('a.imagezoom img').attr('src', newMainSrc);
        $('a.imagezoom').attr('href', newZoomSrc);

        // swap active class
        $('div.imagezoom-thumb.active').removeClass('active');
        obj.addClass('active');
        
        // swap hide class if we want to
        if (Drupal.settings.imagezoom.hide_thumbs == 1) {
          $('div.imagezoom-thumb.imagezoom-thumb-hide').removeClass('imagezoom-thumb-hide');
          obj.parent('div').addClass('imagezoom-thumb-hide');
        }
      }
    }
  }

})(jQuery);
