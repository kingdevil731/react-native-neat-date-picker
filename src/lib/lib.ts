import { i18nLanguages, cn, en, de, es, fr, pt, mg, vi } from './i18n'

export const getTranslation = (language: i18nLanguages) => {
    switch (language) {
        case 'en':
            return en
        case 'cn':
            return cn
        case 'es':
            return es
        case 'de':
            return de
        case 'pt':
            return pt
        case 'fr':
            return fr
        case 'mg':
            return mg
        case 'vi':
            return vi
        default:
            return en
    }
}
