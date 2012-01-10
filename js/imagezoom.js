(function($) {

  /**
   * Javascript functions for creating a zoomed image, adding it to the page on 
   * mouseover, and removing it from the page on mouseout.
   */
  Drupal.behaviors.zoomimage = {
    attach: function() {
      $('a.imagezoom').click(function(e) { e.preventDefault(); });
      $('li.imagezoom-thumb-image').click(function(e) { swap(e, $(this)); });

      switch (Drupal.settings.imagezoom.zoom_type) {
        case 'popup':
          $('a.imagezoom').mouseenter(function(e) { zoom_popup($(this)); });
          $('a.imagezoom').mousemove(function(e) { shift(e, $(this)); });
          $('a.imagezoom').mouseleave(function(e) { reset(); });
          break;
        case 'inner':
          $('a.imagezoom').mouseenter(function(e) { zoom_inner($(this)); });
          $('a.imagezoom').mousemove(function(e) { shift(e, $(this)); });
          $('a.imagezoom').mouseleave(function(e) { reset(); });
          break;
      }

      /**
       * Creates the zoomed image popup, and adds it to the page.
       *
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function zoom_popup(obj) {
        var zoomImageWrapper, zoomImage, title;

        // create div to put zoomed image in
        zoomImageWrapper = $('<div/>', { id: 'zoom-img-wrapper', class: 'popup' });
        // create zoomed image
        zoomImage = $('<img/>', { src: obj.attr('href'), id: 'zoom-img' });
        // add the image wrapper div to its parent
        zoomImageWrapper.appendTo(obj.parent());
        // add the zoomed image to the wrapper div
        zoomImage.appendTo('#zoom-img-wrapper');

        // create a div with the title and add it to the wrapper if the option is set
        if (Drupal.settings.imagezoom.display_title == 1) {
          title = '<div class="zoom-img-title">' + obj.children('img').attr('title') + '</div>';
          zoomImageWrapper.append(title);
        }

        // set the parent of the wrapper div to relative positioning.
        $('#zoom-img-wrapper').parent('div').css('position', 'relative');
      }

      /**
       * Creates the zoomed image, and adds it to the page.
       *
       * @param obj
       *   The object that the mouse is hovering over.
       */
      function zoom_inner(obj) {
        var image, zoomImageWrapper, zoomImage;

        // get the displayed image
        image = obj.children('img');

        // add css styles for the a tag that contains the zoom
        obj.css({
          'position': 'relative',
          'display': 'block',
          'height': image.height(),
          'width': image.width()
        });

        // create div to put zoomed image in and set dimensions
        zoomImageWrapper = $('<div/>', { id: 'zoom-img-wrapper', class: 'inner' });
        zoomImageWrapper.css({'height': image.height(), 'width': image.width()});

        // create zoomed image
        zoomImage = $('<img/>', { src: obj.attr('href'), id: 'zoom-img' });

        // add the image wrapper div to the a tag
        zoomImageWrapper.appendTo(obj);
        // add the zoomed image to the wrapper div
        zoomImage.appendTo('#zoom-img-wrapper');
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
        // of the image if using the popup
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
        thumbSrc = obj.children('a').children('img').attr('src');
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
