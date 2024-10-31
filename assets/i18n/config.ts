import i18next from 'i18next';

import common_en from './locales/en/common.json';
import common_vi from './locales/vi/common.json';

i18next.init({
    compatibilityJSON: 'v3',
    lng: 'vi', 
    debug: true,
    resources: {
        en: {
            common: common_en
        },
        vi: {
            common: common_vi
        }
    }
});

export default i18next;