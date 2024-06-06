// src/i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    yourAge: "Your age:",
    desiredLifespan: "Desired lifespan (years):",
    lifeIsPrecious: "LIFE IS PRECIOUS\nMAKE IT MORE MEANINGFUL",
    weeks: "weeks",
    youHaveLived: "You have lived",
    percentOfYourLife: "% of your life.",
    lifeIsNow: "LIFE IS NOW / All rights reserved by ONE-FRONT."
  },
  pl: {
    yourAge: "Twój wiek:",
    desiredLifespan: "Pożądana długość życia (lata):",
    lifeIsPrecious: "ŻYCIE JEST CENNE\nUCZYŃ JE BARDZIEJ ZNACZĄCYM",
    weeks: "tygodni",
    youHaveLived: "Przeżyłeś",
    percentOfYourLife: "% swojego życia.",
    lifeIsNow: "ŻYCIE JEST TERAZ / Wszystkie prawa zastrzeżone przez ONE-FRONT."
  },
  es: {
    yourAge: "Tu edad:",
    desiredLifespan: "Duración de vida deseada (años):",
    lifeIsPrecious: "LA VIDA ES PRECIOSA\nHAZLA MÁS SIGNIFICATIVA",
    weeks: "semanas",
    youHaveLived: "Has vivido",
    percentOfYourLife: "% de tu vida.",
    lifeIsNow: "LA VIDA ES AHORA / Todos los derechos reservados por ONE-FRONT."
  },
  fr: {
    yourAge: "Votre âge:",
    desiredLifespan: "Durée de vie souhaitée (années):",
    lifeIsPrecious: "LA VIE EST PRÉCIEUSE\nRENDEZ-LA PLUS SIGNIFICATIVE",
    weeks: "semaines",
    youHaveLived: "Vous avez vécu",
    percentOfYourLife: "% de votre vie.",
    lifeIsNow: "LA VIE C'EST MAINTENANT / Tous droits réservés par ONE-FRONT."
  },
  hi: {
    yourAge: "आपकी उम्र:",
    desiredLifespan: "वांछित आयु (वर्ष):",
    lifeIsPrecious: "जीवन अनमोल है\nइसे और अधिक सार्थक बनाएं",
    weeks: "सप्ताह",
    youHaveLived: "आपने अपने जीवन का",
    percentOfYourLife: "% हिस्सा जी लिया है।",
    lifeIsNow: "जीवन अभी है / सभी अधिकार ONE-FRONT द्वारा सुरक्षित हैं।"
  }
};

const i18n = createI18n({
  locale: 'en', // default locale
  fallbackLocale: 'en', // fallback locale
  messages, // set locale messages
});

export default i18n;