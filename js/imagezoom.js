(function($) {

  /**
   * Initialize image zoom functionality.
   */
  Drupal.behaviors.imagezoom = {
    attach: function(context, settings) {
      $('.imagezoom-image', context).once('imagezoom', function () {
        $(this).ezPlus(settings.imagezoom);
      });
    }
  }

})(jQuery);
