<?php

/**
 * Form callback for Image Zoom settings.
 */
function imagezoom_settings_form() {
  $settings = variable_get('imagezoom_settings', array());

  $form['window'] = array(
    '#type' => 'fieldset',
    '#title' => t('Zoom Window'),
    '#collapsible' => TRUE,
  );

  $form['window']['window_w'] = array(
    '#type' => 'textfield',
    '#title' => t('Zoom window width'),
    '#description' => t('The width of the window that the zoomed image appears in.'),
    '#size' => 15,
    '#default_value' => $settings['window_w'],
  );

  $form['window']['window_h'] = array(
    '#type' => 'textfield',
    '#title' => t('Zoom window height'),
    '#description' => t('The height of the window that the zoomed image appears in.'),
    '#size' => 15,
    '#default_value' => $settings['window_h'],
  );

  $form['css'] = array(
    '#type' => 'fieldset',
    '#title' => t('CSS Styles'),
    '#collapsible' => TRUE,
  );

  $form['css']['border_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Border Width'),
    '#description' => t('The width of the border around the zoom window.'),
    '#size' => 15,
    '#default_value' => $settings['border_width'],
  );

  $form['css']['border_color'] = array(
    '#type' => 'textfield',
    '#title' => t('Border Color'),
    '#description' => t('The color of the border around the zoom window.'),
    '#size' => 15,
    '#default_value' => $settings['border_color'],
  );

  $form['css']['background_color'] = array(
    '#type' => 'textfield',
    '#title' => t('Background Color'),
    '#description' => t('The background color of the zoom window.'),
    '#size' => 15,
    '#default_value' => $settings['background_color'],
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save Settings'),
  );

  return $form;
}

/**
 * Validate function for imagezoom_settings_form.
 */
function imagezoom_settings_form_validate($form, &$form_state) {
  // check if values are numbers
  if (!is_numeric($form_state['values']['window_w'])) {
    form_set_error('window_w', 'Zoom window width must be numeric.');
  }
  if (!is_numeric($form_state['values']['window_h'])) {
    form_set_error('window_h', 'Zoom window height must be numeric.');
  }
  if (!is_numeric($form_state['values']['border_width'])) {
    form_set_error('border_width', 'Zoom window border width must be numeric.');
  }

}

/**
 * Submit function for imagezoom_settings_form.
 */
function imagezoom_settings_form_submit($form, &$form_state) {
  $settings = array(
    'window_w' => $form_state['values']['window_w'],
    'window_h' => $form_state['values']['window_h'],
    'border_width' => $form_state['values']['border_width'],
    'border_color' => $form_state['values']['border_color'],
    'background_color' => $form_state['values']['background_color'],
  );

  variable_set('imagezoom_settings', $settings);

  drupal_set_message(t('Settings saved.'));
}
