<?php

/**
 * @file
 * Provides admin functions for the Image Zoom module.
 */

function imagezoom_settings_form() {
  $form['imagezoom_zoom_type'] = array(
    '#type' => 'radios',
    '#title' => t('What style zoom should be used?'),
    '#options' => array(
      'popup' => t('Popup window'),
      'inner' => t('Inner zoom'),
    ),
    '#default_value' => variable_get('imagezoom_zoom_type', 'popup'),
  );

  $form['imagezoom_multiple_thumbs'] = array(
    '#type' => 'radios',
    '#title' => t('Display multiple images as thumbnails?'),
    '#options' => array(t('No'), t('Yes')),
    '#default_value' => variable_get('imagezoom_multiple_thumbs', 0),
  );

  $form['imagezoom_hide_active_thumb'] = array(
    '#type' => 'radios',
    '#title' => t('Hide active thumbnail?'),
    '#description' => t('When multiple images are shown as thumbnails, should
      the active thumbnail be hidden?'),
    '#options' => array(t('No'), t('Yes')),
    '#default_value' => variable_get('imagezoom_hide_active_thumb', 0),
  );

  return system_settings_form($form);
}