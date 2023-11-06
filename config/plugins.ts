export default {
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 3, // Default is 5
    }
  },
  translate: {
    enabled: true,
    config: {
      provider: 'deepl',
      providerOptions: {
        apiKey: '50d0e559-e3af-94c2-29fe-9185eac8a059:fx',
        apiUrl: 'https://api-free.deepl.com',
        localeMap: {
          EN: 'EN-US',
          RU: 'RU'
        },
        apiOptions: {
          formality: 'default',
        }
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      settings: {
        defaultFrom: 'info@sassendigital.com',
        defaultReplyTo: 'info@sassendigital.com',
      },
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@sassendigital.com',
          pass: 'Scarlett_2204'
        },
      }
    },
  },
}
