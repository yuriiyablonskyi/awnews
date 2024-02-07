export interface Language {
  short: string
  full: string
}

const languagesData: Language[] = [
  { short: 'ar', full: 'العربية' },
  { short: 'de', full: 'Deutsch' },
  { short: 'en', full: 'English' },
  { short: 'es', full: 'Español' },
  { short: 'fr', full: 'Français' },
  { short: 'he', full: 'עברית' },
  { short: 'it', full: 'Italiano' },
  { short: 'nl', full: 'Nederlands' },
  { short: 'no', full: 'Norsk' },
  { short: 'pt', full: 'Português' },
  { short: 'ru', full: 'Русский' },
  { short: 'sv', full: 'Svenska' },
  { short: 'ud', full: 'Undefined' },
  { short: 'zh', full: '文' }
]

export default languagesData
