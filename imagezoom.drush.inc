<?php

/**
 * @file
 * Drush integration for Image Zoom.
 */

define('IMAGEZOOM_DOWNLOAD_URI', 'https://github.com/igorlino/elevatezoom-plus/archive/master.zip');
define('IMAGEZOOM_DOWNLOAD_PREFIX', 'elevatezoom-plus-');

/**
 * Implements hook_drush_command().
 */
function imagezoom_drush_command() {
  return array(
    'imagezoom-download' => array(
      'callback' => 'imagezoom_drush_download',
      'description' => dt('Downloads the elevateZoom-Plus library required by Image Zoom.'),
      'bootstrap' => DRUSH_BOOTSTRAP_DRUSH,
      'arguments' => array(
        'path' => dt('Optional. The path to the download folder. If omitted, Drush will use the default location (<code>sites/all/libraries/elevatezoom-plus</code>).'),
      ),
      'aliases' => array('imagezoom-download', 'izd'),
    ),
  );
}

/**
 * Implements hook_drush_help().
 */
function imagezoom_drush_help($section) {
  switch ($section) {
    case 'drush:imagezoom-download':
      return dt('Downloads the elevateZoom-Plus library required by Image Zoom.');
  }
}

/**
 * Drush command to download the elevateZoom-Plus library.
 */
function imagezoom_drush_download() {
  $args = func_get_args();
  if (!empty($args[0])) {
    $path = $args[0];
  }
  else {
    $path = 'sites/all/libraries';
  }

  if (!is_dir($path)) {
    drush_op('mkdir', $path);
    drush_log(dt('Directory @path was created', array('@path' => $path)), 'notice');
  }

  if (is_writable($path)) {
    $olddir = getcwd();
    chdir($path);

    if ($filepath = drush_download_file(IMAGEZOOM_DOWNLOAD_URI)) {
      $filename = basename($filepath);
      $dirname = IMAGEZOOM_DOWNLOAD_PREFIX . basename($filepath, '.zip');

      if (is_dir($dirname) || is_dir('elevatezoom-plus')) {
        drush_delete_dir($dirname, TRUE);
        drush_delete_dir('elevatezoom-plus', TRUE);
        drush_log(dt('The existing elevateZoom-Plus library was deleted from @path', array('@path' => $path)), 'notice');
      }

      drush_tarball_extract($filename);

      if ($dirname != 'elevatezoom-plus') {
        drush_move_dir($dirname, 'elevatezoom-plus', TRUE);
        $dirname = 'elevatezoom-plus';
      }
    }

    if (is_dir($dirname)) {
      drush_log(dt('The elevateZoom-Plus library has been installed in @path', array('@path' => $path)), 'success');
    }
    else {
      drush_log(dt('Drush was unable to install the elevateZoom-Plus library to @path', array('@path' => $path)), 'error');
    }

    chdir($olddir);
  }
  else {
    drush_log(dt('Drush was unable to install the elevateZoom-Plus library because @path is not writable.', array('@path' => $path)), 'warning');
  }
}
