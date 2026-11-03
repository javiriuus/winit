// Aviso legal and privacy policy (LSSI-CE and GDPR). Owner data in one place.
// Standard text: worth a review by a lawyer or gestor.

export const owner = {
  name: "Javier Llarena Sánchez",
  place: "Boadilla del Monte (Comunidad de Madrid), España",
  email: "javierllarena@gmail.com",
  site: "javierllarenafilms.com",
};

const updated = { es: "noviembre de 2026", en: "November 2026" };

export const legalNotice = {
  es: {
    title: "Aviso legal",
    description: "Titular, condiciones de uso y propiedad intelectual de javierllarenafilms.com.",
    updated: `Última actualización: ${updated.es}`,
    sections: [
      {
        h: "Titular de la web",
        p: [
          `En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de que ${owner.site} es una web de ${owner.name}, con domicilio en ${owner.place}.`,
          `Contacto: ${owner.email}.`,
        ],
      },
      {
        h: "Objeto",
        p: [
          "Esta web presenta el trabajo profesional de Javier Llarena como director, director de fotografía y fotógrafo, y permite contactar con él para encargos de producción audiovisual.",
        ],
      },
      {
        h: "Condiciones de uso",
        p: [
          "Quien usa esta web se compromete a hacerlo de forma lícita y a no dañar su funcionamiento ni el de los servicios de terceros que integra. El titular puede modificar los contenidos de la web en cualquier momento.",
        ],
      },
      {
        h: "Propiedad intelectual",
        p: [
          "Los vídeos, fotografías, textos, logotipo y diseño de esta web pertenecen a Javier Llarena o a sus respectivos titulares (artistas, marcas y productoras), y se muestran con fines de portfolio. No pueden reproducirse, distribuirse ni transformarse sin autorización expresa.",
          "Las marcas de terceros que se citan (como New Balance o Heineken) pertenecen a sus propietarios y se mencionan solo para describir trabajos realizados.",
        ],
      },
      {
        h: "Enlaces y contenidos de terceros",
        p: [
          "La web incluye vídeos alojados en YouTube, Vimeo e Instagram y enlaces a redes sociales. El titular no se hace responsable de los contenidos ni de las políticas de esas plataformas.",
        ],
      },
      {
        h: "Responsabilidad",
        p: [
          "El titular procura que la información de la web sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni la disponibilidad continua del servicio.",
        ],
      },
      {
        h: "Legislación aplicable",
        p: ["Este aviso se rige por la legislación española."],
      },
    ],
  },
  en: {
    title: "Legal notice",
    description: "Owner, terms of use and intellectual property of javierllarenafilms.com.",
    updated: `Last updated: ${updated.en}`,
    sections: [
      {
        h: "Website owner",
        p: [
          `As required by article 10 of Spanish Law 34/2002 on information society services (LSSI-CE), ${owner.site} is owned by ${owner.name}, based in ${owner.place}.`,
          `Contact: ${owner.email}.`,
        ],
      },
      {
        h: "Purpose",
        p: [
          "This website presents Javier Llarena's professional work as a director, cinematographer and photographer, and lets visitors contact him about video production work.",
        ],
      },
      {
        h: "Terms of use",
        p: [
          "Visitors agree to use the site lawfully and not to harm its operation or that of the third-party services it includes. The owner may change the site's content at any time.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "The videos, photographs, text, logo and design of this site belong to Javier Llarena or to their respective owners (artists, brands and production companies), and are shown as a portfolio. They may not be reproduced, distributed or modified without express permission.",
          "Third-party trademarks mentioned (such as New Balance or Heineken) belong to their owners and are named only to describe work carried out.",
        ],
      },
      {
        h: "Third-party links and content",
        p: [
          "The site includes videos hosted on YouTube, Vimeo and Instagram and links to social networks. The owner is not responsible for those platforms' content or policies.",
        ],
      },
      {
        h: "Liability",
        p: [
          "The owner tries to keep the site's information accurate and up to date, but does not guarantee it is error-free or always available.",
        ],
      },
      { h: "Governing law", p: ["This notice is governed by Spanish law."] },
    ],
  },
};

export const privacyPolicy = {
  es: {
    title: "Política de privacidad",
    description: "Qué datos recoge javierllarenafilms.com, para qué y cómo ejercer tus derechos.",
    updated: `Última actualización: ${updated.es}`,
    sections: [
      {
        h: "Responsable",
        p: [`${owner.name}, ${owner.place}. Email: ${owner.email}.`],
      },
      {
        h: "Qué datos recojo",
        p: [
          "Solo los que escribes en el formulario de contacto: nombre, email, mensaje y, si los indicas, tipo de proyecto, fechas y presupuesto orientativo. También recibes mis respuestas por email si me escribes directamente.",
        ],
      },
      {
        h: "Para qué los uso",
        p: [
          "Para responder a tu mensaje y, si llegamos a trabajar juntos, preparar y gestionar el encargo. No los uso para enviarte publicidad ni los cedo a nadie para ese fin.",
        ],
      },
      {
        h: "Legitimación",
        p: [
          "Tu consentimiento al enviar el formulario y, si contratamos un proyecto, la aplicación de medidas precontractuales o del propio contrato.",
        ],
      },
      {
        h: "Cuánto tiempo los guardo",
        p: [
          "El tiempo necesario para atender tu consulta y, si hay encargo, el que exijan las obligaciones legales y fiscales. Puedes pedir que los borre en cualquier momento.",
        ],
      },
      {
        h: "Quién más los trata",
        p: [
          "Proveedores que hacen funcionar la web y el correo: Vercel Inc. (alojamiento de la web) y Google (cuenta de correo donde llegan los mensajes). Pueden tratar datos fuera del Espacio Económico Europeo con las garantías previstas en el RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo.",
        ],
      },
      {
        h: "Tus derechos",
        p: [
          `Puedes acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento, limitarlo o pedir su portabilidad escribiendo a ${owner.email}. Si crees que no se han respetado, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).`,
        ],
      },
      {
        h: "Cookies y estadísticas",
        p: [
          "La web no usa cookies publicitarias ni de seguimiento. Guarda una cookie técnica (NEXT_LOCALE) solo si eliges idioma con el botón ES/EN, para recordarlo.",
          "Las estadísticas de visitas y velocidad (Vercel Web Analytics y Speed Insights) funcionan sin cookies y con datos agregados que no identifican a nadie.",
          "Los vídeos se cargan desde YouTube (en modo de privacidad mejorada), Vimeo o Instagram solo cuando pulsas reproducir; a partir de ese momento se aplican las políticas de esas plataformas.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    description: "What data javierllarenafilms.com collects, why, and how to exercise your rights.",
    updated: `Last updated: ${updated.en}`,
    sections: [
      {
        h: "Data controller",
        p: [`${owner.name}, ${owner.place}. Email: ${owner.email}.`],
      },
      {
        h: "What data I collect",
        p: [
          "Only what you type into the contact form: name, email, message and, if you give them, project type, dates and approximate budget.",
        ],
      },
      {
        h: "What I use it for",
        p: [
          "To reply to your message and, if we work together, to prepare and manage the job. I don't use it to send you advertising or pass it on to anyone for that purpose.",
        ],
      },
      {
        h: "Legal basis",
        p: ["Your consent when you send the form and, if we agree a project, pre-contractual steps or the contract itself."],
      },
      {
        h: "How long I keep it",
        p: [
          "As long as needed to answer your enquiry and, if there is a job, as long as legal and tax obligations require. You can ask me to delete it at any time.",
        ],
      },
      {
        h: "Who else processes it",
        p: [
          "Providers that run the site and email: Vercel Inc. (website hosting) and Google (the email account messages arrive in). They may process data outside the European Economic Area under GDPR safeguards such as the EU-US Data Privacy Framework or standard contractual clauses.",
        ],
      },
      {
        h: "Your rights",
        p: [
          `You can access, correct or delete your data, object to or restrict its processing, or ask for portability by writing to ${owner.email}. If you think your rights have not been respected, you can complain to the Spanish Data Protection Agency (aepd.es).`,
        ],
      },
      {
        h: "Cookies and statistics",
        p: [
          "The site uses no advertising or tracking cookies. It stores one technical cookie (NEXT_LOCALE) only if you pick a language with the ES/EN switch, to remember it.",
          "Visit and speed statistics (Vercel Web Analytics and Speed Insights) work without cookies, using aggregated data that identifies no one.",
          "Videos load from YouTube (privacy-enhanced mode), Vimeo or Instagram only when you press play; from then on those platforms' policies apply.",
        ],
      },
    ],
  },
};
