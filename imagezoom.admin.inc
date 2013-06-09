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
    '#type' => 'checkbox',
    '#title' => t('Display multiple images as thumbnails?'),
    '#default_value' => variable_get('imagezoom_multiple_thumbs', 0),
  );

  if (module_exists('jcarousel')) {
    $form['imagezoom_thumbs_jcarousel'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display thumbnails as a jCarousel?'),
      '#default_value' => variable_get('imagezoom_thumbs_jcarousel', 0),
      '#states' => array(
        'visible' => array(
          ':input[name="imagezoom_multiple_thumbs"]' => array('checked' => TRUE),
        ),
      ),
    );
  }

  $form['imagezoom_hide_active_thumb'] = array(
    '#type' => 'checkbox',
    '#title' => t('Hide active thumbnail?'),
    '#description' => t('When multiple images are shown as thumbnails, should
      the active thumbnail be hidden?'),
    '#default_value' => variable_get('imagezoom_hide_active_thumb', 0),
  );

  $form['imagezoom_display_title'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display the image title in the zoom window?'),
    '#default_value' => variable_get('imagezoom_display_title', 0),
    '#states' => array(
      'visible' => array(
        ':input[name="imagezoom_zoom_type"]' => array('value' => 'popup'),
      ),
    ),
  );

  if (module_exists('colorbox')) {
    $form['imagezoom_colorbox'] = array(
      '#type' => 'checkbox',
      '#title' => t('Open image in Colorbox when clicked?'),
      '#default_value' => variable_get('imagezoom_colorbox', 0),
    );
  }

  $form['imagezoom_loading'] = array(
    '#type' => 'fieldset',
    '#title' => t('Script Loading'),
    '#collapsible' => TRUE,
  );

  $form['imagezoom_loading']['imagezoom_load_all'] = array(
    '#type' => 'checkbox',
    '#title' => t('Load the Image Zoom javascript on all pages?'),
    '#default_value' => variable_get('imagezoom_load_all', 0),
  );

  $types = node_type_get_names();
  $form['imagezoom_loading']['imagezoom_load_all_types'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Content types'),
    '#description' => t('Select the content types the script will be loaded for.'),
    '#options' => $types,
    '#default_value' => variable_get('imagezoom_load_all_types', array()),
    '#states' => array(
      'visible' => array(
        ':input[name="imagezoom_load_all"]' => array('checked' => TRUE),
      ),
    ),
  );

  return system_settings_form($form);
}
