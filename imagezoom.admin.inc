<?php

/**
 * Form callback for Image Zoom settings.
 */
function imagezoom_settings_form() {
  $form['window_w'] = array(
    '#type' => 'textfield',
    '#title' => t('Zoom window width'),
    '#description' => t('The width of the window that the zoomed image appears in.'),
    '#size' => 15,
  );
  
  $form['window_h'] = array(
    '#type' => 'textfield',
    '#title' => t('Zoom window height'),
    '#description' => t('The height of the window that the zoomed image appears in.'),
    '#size' => 15,
  );
  
  $form['css'] = array(
    '#type' => 'fieldset',
    '#title' => t('CSS Styles'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  
  $form['css']['border_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Border Width'),
    '#description' => t('The width of the border around the zoom window.'),
    '#size' => 15,
  );
  
  $form['css']['border_color'] = array(
    '#type' => 'textfield',
    '#title' => t('Border Color'),
    '#description' => t('The color of the border around the zoom window.'),
    '#size' => 15,
  );
  
  $form['css']['background_color'] = array(
    '#type' => 'textfield',
    '#title' => t('Background Color'),
    '#description' => t('The background color of the zoom window.'),
    '#size' => 15,
  );
  
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );
  
  return $form;
}
