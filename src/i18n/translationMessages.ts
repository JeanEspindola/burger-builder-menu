import enTranslationMessages from './en'
import ptbrTranslationMessages from './pt_BR'

const translationMessages : {
	[languageKey: string] : { [translationKey: string]: string};
} = {
	en: enTranslationMessages,
	pt_BR: ptbrTranslationMessages,
}

export default translationMessages