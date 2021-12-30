Image Zoom
--------
This module provides an field formatter to zoom an image while hovering over
it. An image style is selected for the default display image, and an additional
style is selected to be used as the zoomed image. When a user hovers over the
displayed image, the zoomed image appears and is positioned relative to the
current mouse position.

Installation
------------

- Install this module using the official Backdrop CMS instructions at
  https://docs.backdropcms.org/documentation/extend-with-modules.

Configuration
-------------
To configure the Image Zoom display, go to Administration > Structure > Content
types and select the content type you would want to use Image Zoom with. If you
do not already have an Image field defined, add one by going to the Manage Fields
tab. After you have an Image field, go to the Manage Display tab. Change the
Format for your Image field to Image Zoom. To change which styles are displayed
for the displayed image and the zoomed image, click the gear icon at the end of
the row, select the desired image styles, and click Update.

Differences from Drupal 7
-------------------------

- Should work the same as Drupal 7.

Issues
------

Bugs and feature requests should be reported in [the Issue Queue](https://github.com/backdrop-contrib/imagezoom/issues).

Current Maintainers
-------------------

<!-- - [Justin Keiser](https://github.com/keiserjb). -->

Credits <!-- This section is required. -->
-------

- Ported to Backdrop CMS by [Justin Keiser](https://github.com/keiserjb).
- Originally written for Drupal by [Ben Davis](https://github.com/davisben).

License
-------

This project is GPL v2 software.
See the LICENSE.txt file in this directory for complete text.