// src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    yourAge: 'Your age:',
    desiredLifespan: 'Desired lifespan (years):',
    lifeIsPrecious: 'LIFE IS PRECIOUS',
    makeItMoreMeaningful: 'MAKE IT MORE MEANINGFUL',
    weeks: 'weeks',
    youHaveLived: 'You have lived',
    percentOfYourLife: '% of your life',
    lifeIsNow: 'LIFE IS NOW / All rights reserved by ONE-FRONT.',
    inputWarning: 'Choose a number from 0 to 85 please 😊',
  },
  pl: {
    yourAge: 'Twój wiek:',
    desiredLifespan: 'Pożądana długość życia (lata):',
    lifeIsPrecious: 'ŻYCIE JEST CENNE',
    makeItMoreMeaningful: 'UCZYŃ JE BARDZIEJ ZNACZĄCYM',
    weeks: 'tygodni',
    youHaveLived: 'Przeżyłeś',
    percentOfYourLife: '% swojego życia',
    lifeIsNow:
      'ŻYCIE JEST TERAZ / Wszystkie prawa zastrzeżone przez ONE-FRONT.',
    inputWarning: 'Proszę wybrać liczbę od 0 do 85 😊',
  },
  es: {
    yourAge: 'Tu edad:',
    desiredLifespan: 'Duración de vida deseada (años):',
    lifeIsPrecious: 'LA VIDA ES PRECIOSA',
    makeItMoreMeaningful: 'HAZLA MÁS SIGNIFICATIVA',
    weeks: 'semanas',
    youHaveLived: 'Has vivido',
    percentOfYourLife: '% de tu vida',
    lifeIsNow:
      'LA VIDA ES AHORA / Todos los derechos reservados por ONE-FRONT.',
    inputWarning: 'Elija un número del 0 al 85, por favor 😊',
  },
  fr: {
    yourAge: 'Votre âge:',
    desiredLifespan: 'Durée de vie souhaitée (années):',
    lifeIsPrecious: 'LA VIE EST PRÉCIEUSE',
    makeItMoreMeaningful: 'RENDEZ-LA PLUS SIGNIFICATIVE',
    weeks: 'semaines',
    youHaveLived: 'Vous avez vécu',
    percentOfYourLife: '% de votre vie',
    lifeIsNow: "LA VIE C'EST MAINTENANT / Tous droits réservés par ONE-FRONT.",
    inputWarning: "Choisissez un nombre de 0 à 85, s'il vous plaît 😊",
  },
  hi: {
    yourAge: 'आपकी उम्र:',
    desiredLifespan: 'वांछित आयु (वर्ष):',
    lifeIsPrecious: 'जीवन अनमोल है',
    makeItMoreMeaningful: 'इसे और अधिक सार्थक बनाएं',
    weeks: 'सप्ताह',
    youHaveLived: 'आपने अपने जीवन का',
    percentOfYourLife: '% हिस्सा जी लिया है।',
    lifeIsNow: 'जीवन अभी है / सभी अधिकार ONE-FRONT द्वारा सुरक्षित हैं।',
    inputWarning: 'कृपया 0 से 85 तक कोई संख्या चुनें 😊',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  fallbackLocale: 'en', // fallback locale
  messages, // set locale messages
})

export default i18n
