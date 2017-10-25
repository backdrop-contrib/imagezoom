<?php

/**
 * @file
 * Drush integration for Image Zoom.
 */

define('IMAGEZOOM_DOWNLOAD_URI', 'https://github.com/igorlino/elevatezoom-plus/archive/master.zip');

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
  if ($args[0]) {
    $path = $args[0];
  }
  else {
    $path = drush_get_context('DRUSH_DRUPAL_ROOT') . '/sites/all/libraries/elevatezoom-plus';
  }

  drush_log(dt('Download destination path: "@path"', array('@path' => $path)), 'notice');

  $path_components = array_filter(explode('/', $path));
  $subpath = '';
  while (count($path_components) && $subpath .= '/' . array_shift($path_components)) {
    if (!is_dir($subpath)) {
      drush_op('mkdir', $subpath);
      drush_log(dt('Directory @subpath was created', array('@subpath' => $subpath)), 'notice');
    }
  }

  $olddir = getcwd();
  chdir($path);

  $filename = basename(IMAGEZOOM_DOWNLOAD_URI);
  $dirname = basename(IMAGEZOOM_DOWNLOAD_URI, '.zip');

  if (is_dir($dirname)) {
    drush_log(dt('The existing elevateZoom-Plus library at @path was overwritten.', array('@path' => $path)), 'notice');
  }

  if (is_file($filename)) {
    drush_op('unlink', $filename);
  }

  if (!drush_shell_exec('wget ' . IMAGEZOOM_DOWNLOAD_URI)) {
    drush_shell_exec('curl -O ' . IMAGEZOOM_DOWNLOAD_URI);
  }

  if (is_file($filename)) {
    drush_shell_exec('unzip -qq -o ' . $filename);
    drush_op('unlink', $filename);
  }

  chdir($olddir);

  if (is_dir($path . '/' . $dirname)) {
    drush_log(dt('Drush was unable to download the elevateZoom-Plus library to @path', array('@path' => $path)), 'error');
  }
  else {
    drush_log(dt('The elevateZoom-Plus library has been downloaded to @path', array('@path' => $path)), 'success');
  }
}
