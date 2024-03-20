// ./src/admin/app.js`
'use strict';

export default {
  config: {
    locales: [ 'en', 'bg', 'ru' ],
    translations: {
      en: {
        'menus.customFields.field_name.label': 'Translated Label',
        'menus.customFields.field_name.placeholder': 'Translated Placeholder',
        'menus.customFields.field_name.description': 'Translated Description',
      },
      bg: {
        'menus.customFields.field_name.label': 'Translated Label български',
        'menus.customFields.field_name.placeholder': 'Translated Placeholder български',
        'menus.customFields.field_name.description': 'Translated Description български',
      },
      ru: {
        'menus.customFields.field_name.label': 'Translated Label руски',
        'menus.customFields.field_name.placeholder': 'Translated Placeholder руски',
        'menus.customFields.field_name.description': 'Translated Description руски',
      },
    },
  },
  // etc.
};