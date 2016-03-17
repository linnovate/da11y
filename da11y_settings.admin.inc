<?php 
/**
 * @file
 * Admin forms.
 */

/**
 * FAPI system admin form.
 */
function da11y_admin_settings($form, &$form_state) {

  $da11y_setting = variable_get('da11y_setting','');

  $fields = array(
  //  'da11y_toolbar_title' => 'Title top of the toolbar',
    'da11y_resize_font_plus' => 'Increase',
    'da11y_resize_font_minus' => 'Decrease',
    'da11y_bg_grayscale' => 'Grayscale',
    'da11y_bg_high_contrast' => 'High Contrast',
    'da11y_bg_negative_contrast' => 'Negative Contrast',
    'da11y_bg_light' => 'Light Background',
    'da11y_links_underline' => 'Links Underline',
    'da11y_readable_font' => 'Readable Font',
    'da11y_reset' => 'Reset',
  );

  $links = array(
    'da11yLink_sitemap' => 'Sitemap',
    'da11yLink_help' => 'Help',
  );
  
  

  $form["da11y_labels"] = array(
          '#type' => 'fieldset',
          '#title' => t("Da11y label's"),
  );
  
  foreach ($fields as $key => $value){
    $form["da11y_labels"][$key] = array(
          '#type' => 'textfield',
          '#title' => t($value),
          '#default_value' => isset($da11y_setting[$key]) ? $da11y_setting[$key] : $value, 
    );
  }


  foreach ($links as $key => $value){
    $form["da11y_links_fieldset".$key] = array(
          '#type' => 'fieldset',
          '#title' => t("Da11y links: ". $value),
    );
    $form["da11y_links_fieldset".$key][$key.'_title'] = array(
          '#type' => 'textfield',
          '#title' => t('Title'),
          '#default_value' => isset($da11y_setting[$key.'_title']) ? $da11y_setting[$key.'_title'] : $value, 
    );
    $form["da11y_links_fieldset".$key][$key.'_url'] = array(
          '#type' => 'textfield',
          '#title' => t('Url'),
          '#default_value' => isset($da11y_setting[$key.'_url']) ? $da11y_setting[$key.'_url'] : $value, 
    );
  }
      
  $form['#submit'][] = '_da11y_admin_settings_submit';
 
  return system_settings_form($form);
}

function _da11y_admin_settings_submit($form, &$form_state) {

  variable_set('da11y_setting', $form_state['values']);

}





