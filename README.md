# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## FOLDER STRUCCTURE
.
├── dist
│   ├── apple-touch-icon.png
│   ├── assets
│   │   └── images...
│   ├── faq
│   │   ├── faq.en.json
│   │   └── faq.es.json
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── index.html
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── apple-touch-icon.png
│   ├── faq
│   │   ├── faq.en.json
│   │   └── faq.es.json
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
├── README.md
├── src
│   ├── App.jsx
│   ├── App.scss
│   ├── assets
│   │   ├── fonts
│   │   │   ├── PTSans-Regular.ttf
│   │   │   ├── PTSans-Regular.woff
│   │   │   ├── PTSans-Regular.woff2
│   │   │   ├── PTSerif-Regular.ttf
│   │   │   ├── PTSerif-Regular.woff
│   │   │   └── PTSerif-Regular.woff2
│   │   └── img
│   │       ├── 3d-brainstorming.png
│   │       ├── ab-testing.webp
│   │       ├── ambient-01.webp
│   │       ├── calendar.png
│   │       ├── chat-badge.webp
│   │       ├── commission.webp
│   │       ├── contact-cta.webp
│   │       ├── customization.webp
│   │       ├── data-ownership.webp
│   │       ├── delicious-burger-with-emojis copia.png
│   │       ├── delicious-burger-with-emojis.png
│   │       ├── engagement.png
│   │       ├── feature-view-image.png
│   │       ├── feature-view-text.png
│   │       ├── feature-view-video.png
│   │       ├── gift-card.webp
│   │       ├── hero-01.jpg
│   │       ├── hero-02.jpg
│   │       ├── hero-03.jpg
│   │       ├── hero-contact.jpg
│   │       ├── hero-demo-market.jpg
│   │       ├── hero-demo-pizza.jpg
│   │       ├── hero-features.jpg
│   │       ├── icon-chains.svg
│   │       ├── icon-gastro-market.svg
│   │       ├── icon-hotels.svg
│   │       ├── icon-restaurant.svg
│   │       ├── logo-red.svg
│   │       ├── logo-symbol.svg
│   │       ├── management.png
│   │       ├── mobile-payment-illustration.jpg
│   │       ├── multilingual.webp
│   │       ├── qr-code-phone.png
│   │       ├── qr-code.webp
│   │       ├── responsive.webp
│   │       ├── slider-hero-1.jpg
│   │       ├── slider-hero-2.jpg
│   │       ├── slider-hero-3.jpg
│   │       ├── slider-hero-4.jpg
│   │       ├── table-turnover.webp
│   │       └── ux-friendly.webp
│   ├── components
│   │   ├── chatbot
│   │   │   ├── analytics.js
│   │   │   ├── antibot.js
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── forms
│   │   │   │   ├── IssueForm.jsx
│   │   │   │   ├── LeadForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── TrialForm.jsx
│   │   │   │   └── validate.js
│   │   │   ├── generators
│   │   │   │   ├── index.js
│   │   │   │   └── promptConfig.json
│   │   │   ├── intents.js
│   │   │   ├── retrieval.js
│   │   │   ├── store.js
│   │   │   ├── style.js
│   │   │   └── TermsModal.jsx
│   │   ├── layout
│   │   │   ├── ChatBadge.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ScrollTopButton.jsx
│   │   ├── sections
│   │   │   ├── Cards.jsx
│   │   │   ├── CarouselText.jsx
│   │   │   ├── Chatbox.jsx
│   │   │   ├── ContactCTA.jsx
│   │   │   ├── Faq.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── PricingTabs.jsx
│   │   │   ├── PromoBannerLoop.jsx
│   │   │   └── Tabs.jsx
│   │   └── ui
│   │       ├── Accordion.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Carousel.jsx
│   │       ├── Icons.jsx
│   │       └── PricingCards.jsx
│   ├── hooks
│   │   ├── useButtonChatActions.jsx
│   │   ├── useChatActions.jsx
│   │   ├── useDisableMediaInteractions.jsx
│   │   ├── useDragToSlide.jsx
│   │   ├── useGsapHorizontalScroll.jsx
│   │   ├── useLenisScroll.jsx
│   │   ├── useMediaQuery.jsx
│   │   └── useScrollToTop.jsx
│   ├── i18n
│   │   ├── i18n.js
│   │   └── locales
│   │       ├── de
│   │       │   └── translation.json
│   │       ├── en
│   │       │   └── translation.json
│   │       ├── es
│   │       │   └── translation.json
│   │       ├── fr
│   │       │   └── translation.json
│   │       └── it
│   │           └── translation.json
│   ├── index.css
│   ├── layout
│   │   └── RootLayout.jsx
│   ├── main.jsx
│   ├── pages
│   │   ├── protected
│   │   └── public
│   │       ├── About.jsx
│   │       ├── Academy.jsx
│   │       ├── AddsOn.jsx
│   │       ├── Blogs.jsx
│   │       ├── Contact.jsx
│   │       ├── CookiesPolicy.jsx
│   │       ├── Demos.jsx
│   │       ├── Faq.jsx
│   │       ├── Features.jsx
│   │       ├── Home.jsx
│   │       ├── LegalNotice.jsx
│   │       ├── Partners.jsx
│   │       ├── Pricing.jsx
│   │       ├── PrivacyPolicy.jsx
│   │       ├── QrCodes.jsx
│   │       ├── SalesConsultant.jsx
│   │       ├── SmartMarket.jsx
│   │       ├── Status.jsx
│   │       └── TermsOfService.jsx
│   ├── store
│   │   ├── constants.jsx
│   │   ├── reducers.jsx
│   │   └── store.jsx
│   └── styles
│       ├── _base.general.scss
│       ├── _base.mixins.scss
│       ├── _base.variables.scss
│       ├── _global.fonts.scss
│       ├── _global.helpers.scss
│       ├── _global.layouts.scss
│       ├── com-la.chat-badge.scss
│       ├── com-la.footer.scss
│       ├── com-la.header.scss
│       ├── com-la.scroll-top.scss
│       ├── com-se.carousel-text.scss
│       ├── com-se.chatbox.scss
│       ├── com-se.contactcta.scss
│       ├── com-se.faq.scss
│       ├── com-se.hero.scss
│       ├── com-se.pricing.scss
│       ├── com-se.promo.scss
│       ├── com-se.tabs.scss
│       ├── com-ui.accordion.scss
│       ├── com-ui.button.scss
│       ├── com-ui.card.scss
│       ├── com-ui.carousel.scss
│       └── com-ui.forms.scss
├── vercel.json
└── vite.config.js