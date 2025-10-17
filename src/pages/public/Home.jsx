// Import styles and libraries
import "../../App.scss";
// Import components
import ComponentHero from "../../components/sections/Hero";
import ComponentCards from "../../components/sections/Cards";
import ComponentTabs from "../../components/sections/Tabs";
import ComponentCarouselText from "../../components/sections/CarouselText";
import ComponentContactCTA from "../../components/sections/ContactCTA";
import ComponentFaq from "../../components/sections/Faq";
// Import icons & images
import ImgHero01 from "../../assets/img/hero-01.jpg";
import ImgHero02 from "../../assets/img/hero-02.jpg";
import ImgHero03 from "../../assets/img/hero-03.jpg";

import ImgCommission from "../../assets/img/commission.webp";
import ImgGiftCart from "../../assets/img/gift-card.webp";
import ImgMultilingual from "../../assets/img/multilingual.webp";
import ImgQrCode from "../../assets/img/qr-code.webp";
import ImgResponsive from "../../assets/img/responsive.webp";
import ImgUxResponsive from "../../assets/img/ux-friendly.webp";
import IconChains from "../../assets/img/icon-chains.svg";
import IconGastro from "../../assets/img/icon-gastro-market.svg";
import IconHotels from "../../assets/img/icon-hotels.svg";
import IconRestaurant from "../../assets/img/icon-restaurant.svg";
import ImgDataOwnership from "../../assets/img/data-ownership.webp";
import ImgAbTesting from "../../assets/img/ab-testing.webp";
import ImgCustomization from "../../assets/img/customization.webp";
import ImgTableTurnOver from "../../assets/img/table-turnover.webp";

import ImgContactCta from '../../assets/img/contact-cta.webp';

import ImgAmbient01 from "../../assets/img/delicious-burger-with-emojis.png";
import ImgManagement from "../../assets/img/management.png";
import ImgCustomizable from "../../assets/img/3d-brainstorming.png";
import ImgEngagement from "../../assets/img/engagement.png";
import ImgCalendar from "../../assets/img/calendar.png";


const Home = () => {

    const SectionHero = {
        "text": {
            "intro": "section.hero.homepage.intro",
            "title": "section.hero.homepage.title",
            "subtitle": "section.hero.homepage.subtitle",
            "claimer": "section.hero.homepage.claimer"
        },
        "slides": [
            {
                image: ImgHero01,
                alt: "Delicious pizza",
                text: "Try our new Margherita",
                cta: "Contact us now!",
                link: "/contact",
                width: 834,
                height: 450,
            },
            {
                image: ImgHero02,
                alt: "Refreshing drink",
                text: "Summer specials available!",
                // link: "/demo",
                width: 834,
                height: 450,
            },
            {
                image: ImgHero03,
                alt: "Refreshing drink",
                width: 834,
                height: 450,
            }
        ],
        "buttons": [
            {
                text: "ui.buttons.demo",
                cssClass: "btn-solid-light btn-inner-shadow",
                to: "/demos",
            },
            {
                text: "ui.buttons.promo",
                cssClass: "btn-solid-red btn-hover-gradient-red",
                onClick: "openChat:lead",
            }
        ]

    }
    const SectionCardsFeatures01 = {
        "cardsData": [
            {
            "id": 1,
            "isOnClick": true,
            "text": "section.cards.qrCode.title",
            "description": "section.cards.qrCode.description",
            "image": ImgQrCode,
            },
            {
            "id": 2,
            "isOnClick": true,
            "text": "section.cards.tablet.title",
            "description": "section.cards.tablet.description",
            "image": ImgResponsive,
            },
            {
            "id": 3,
            "isOnClick": true,
            "text": "section.cards.giftCard.title",
            "description": "section.cards.giftCard.description",
            "image": ImgGiftCart,
            },
            {
            "id": 4,
            "isOnClick": true,
            "text": "section.cards.marketing.title",
            "description": "section.cards.marketing.description",
            "image": ImgUxResponsive,
            },
            {
            "id": 5,
            "isOnClick": true,
            "text": "section.cards.multilingual.title",
            "description": "section.cards.multilingual.description",
            "image": ImgMultilingual,
            },
            {
            "id": 6,
            "cssClass": "card-red",
            "isOnClick": true,
            "text": "section.cards.comission.title",
            "description": "section.cards.comission.description",
            "image": ImgCommission,
            },
        ]
    };
    const SectionIndustries = {
        "intro": {
            "title": "section.cards.intro.industries.title",
        },
        "cardsData": [
            {
                "id": 1,
                "isOnClick": true,
                "text": "section.cards.gastroMarket.title",
                "description": "section.cards.gastroMarket.description",
                "image": IconGastro,
                "cssClass": "card-red-faded",
            },
            {
                "id": 2,
                "isOnClick": true,
                "text": "section.cards.hotels.title",
                "description": "section.cards.hotels.description",
                "image": IconHotels,
                "cssClass": "card-red-faded",
            },
            {
                "id": 3,
                "isOnClick": true,
                "text": "section.cards.restaurants.title",
                "description": "section.cards.restaurants.description",
                "image": IconRestaurant,
                "cssClass": "card-red-faded",
            },
            {
                "id": 4,
                "isOnClick": true,
                "text": "section.cards.chains.title",
                "description": "section.cards.chains.description",
                "image": IconChains,
                "cssClass": "card-red-faded",
            },
        ],
        "cssClass": "section-red-4-cards section-cards-icon"
    };
    const SectionDinningExperience = {
        "tabs": false,
        "title": "section.tabs.dinning.title",
        "tabsContent": [
            {
                "bullets": [
                    "section.tabs.dinning.bullets.01",
                    "section.tabs.dinning.bullets.02",
                    "section.tabs.dinning.bullets.03",
                    "section.tabs.dinning.bullets.04",
                ],
                "image": {
                    "src": ImgAmbient01,
                    "alt": "Description",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.promo",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        onClick: "openChat",
                    }
                ]
            }
        ],
    };
    const SectionCardsFeatures02 = {
        "cardsData": [
            {
                "id": 1,
                "isOnClick": true,
                "text": "section.cards.data.title",
                "description": "section.cards.data.description",
                "image": ImgDataOwnership,
            },
            {
                "id": 2,
                "isOnClick": true,
                "text": "section.cards.abTesting.title",
                "description": "section.cards.abTesting.description",
                "image": ImgAbTesting,
            },
            {
                "id": 3,
                "isOnClick": true,
                "text": "section.cards.customization.title",
                "description": "section.cards.customization.description",
                "image": ImgCustomization,
            },
            {
                "id": 4,
                "isOnClick": true,
                "text": "section.cards.tableTurnover.title",
                "description": "section.cards.tableTurnover.description",
                "image": ImgTableTurnOver,
            },
        ]
    };
    const SectionMultiTabs = {
        "tabs": true,
        "tabsContent": [
            {
                "title": "section.tabs.management.title",
                "bullets": [
                    "section.tabs.management.bullets.01",
                    "section.tabs.management.bullets.02",
                    "section.tabs.management.bullets.03",
                    "section.tabs.management.bullets.04",
                ],
                "image": {
                    "src": ImgManagement,
                    "alt": "Restaurant menu management dashboard",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.features",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        to: "/features"
                    }
                ]
            },
            {
                "title": "section.tabs.customization.title",
                "bullets": [
                    "section.tabs.customization.bullets.01",
                    "section.tabs.customization.bullets.02",
                    "section.tabs.customization.bullets.03",
                    "section.tabs.customization.bullets.04",
                ],
                "image": {
                    "src": ImgCustomizable,
                    "alt": "Customizing a digital menu",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.demo",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        to: "/demos"
                    }
                ]
            },
            {
                "title": "section.tabs.engagement.title",
                "bullets": [
                    "section.tabs.engagement.bullets.01",
                    "section.tabs.engagement.bullets.02",
                    "section.tabs.engagement.bullets.03",
                    "section.tabs.engagement.bullets.04",
                ],
                "image": {
                    "src": ImgEngagement,
                    "alt": "Digital loyalty card on a phone",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.promo",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        onClick: "openChat:trial",
                    }
                ]
            },
        ],
        "cssClass": "section-overflow-background section-tabs-bullet-icon",
        "backgroundOverflow": "background-base-200"
    };
    const SectionBenefits = {
        "cssClass": "section-carousel-bullet-icon",
        "title": "section.carouselText.benefits.title",
        "content": [
            {
                "title": "section.carouselText.benefits.clients.title",
                "bullets": [
                    "section.carouselText.benefits.clients.bullet01",
                    "section.carouselText.benefits.clients.bullet02",
                    "section.carouselText.benefits.clients.bullet03",
                    "section.carouselText.benefits.clients.bullet04",
                    "section.carouselText.benefits.clients.bullet05",
                ]
            },
            {
                "title": "section.carouselText.benefits.business.title",
                "bullets": [
                    "section.carouselText.benefits.business.bullet01",
                    "section.carouselText.benefits.business.bullet02",
                    "section.carouselText.benefits.business.bullet03",
                    "section.carouselText.benefits.business.bullet04",
                    "section.carouselText.benefits.business.bullet05",
                ]
            },
            {
                "title": "section.carouselText.benefits.employees.title",
                "bullets": [
                    "section.carouselText.benefits.employees.bullet01",
                    "section.carouselText.benefits.employees.bullet02",
                    "section.carouselText.benefits.employees.bullet03",
                    "section.carouselText.benefits.employees.bullet04",
                    "section.carouselText.benefits.employees.bullet05",
                ]
            },
            {
                "title": "section.carouselText.benefits.technical.title",
                "bullets": [
                    "section.carouselText.benefits.technical.bullet01",
                    "section.carouselText.benefits.technical.bullet02",
                    "section.carouselText.benefits.technical.bullet03",
                    "section.carouselText.benefits.technical.bullet04",
                    "section.carouselText.benefits.technical.bullet05",
                ]
            }
        ]
    };
    const SectionContactCta01 = {
        "text": {
            "title": "section.contact.title",
            "paragraph": "section.contact.description",
        },
        "buttons": [
            {
                text: "ui.buttons.formular",
                cssClass: "btn-solid-light btn-inner-shadow",
                onClick: "openChat:lead",
            }
        ],
        "image": {
            image: ImgContactCta,
            alt: "Delicious pizza",
            text: "Try our new Margherita",
            cta: "Contact us now!",
            link: "/contact",
            width: 834,
            height: 450,
        },
        "cssClass": "section-overflow-background",
        "backgroundOverflow": "background-red-200"
    };
    const SectionReviews = {
        "title": "section.carouselText.reviews.title",
        "content": [
            {
                "title": "section.carouselText.reviews.pizzeria.title",
                "bullets": [
                    "section.carouselText.reviews.pizzeria.bullet01",
                ]
            },
            {
                "title": "section.carouselText.reviews.foodMarket.title",
                "bullets": [
                    "section.carouselText.reviews.foodMarket.bullet01",
                ]
            },
            {
                "title": "section.carouselText.reviews.restaurantFoodMarket.title",
                "bullets": [
                    "section.carouselText.reviews.restaurantFoodMarket.bullet01",
                ]
            },
        ],
    };
    const SectionTest30Days = {
        "tabs": false,
        "cssClass": "section-tab-red",
        "tabsContent": [
            {
                "title": "section.tabs.test30days.title",
                "bullets": [
                    "section.tabs.test30days.bullets.01"
                ],
                "image": {
                    "src": ImgCalendar,
                    "alt": "Description",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.promo",
                        cssClass: "btn-solid-light btn-inner-shadow",
                        onClick: "openChat:trial"
                    }
                ]
            }
        ]
    };
    const SectionSteps = {
        "title": "section.carouselText.steps.title",
        "content": [
            {
                "title": "section.carouselText.steps.step01.title",
                "bullets": [
                    "section.carouselText.steps.step01.bullet01",
                    "section.carouselText.steps.step01.bullet02",
                    "section.carouselText.steps.step01.bullet03",
                ]
            },
            {
                "title": "section.carouselText.steps.step02.title",
                "bullets": [
                    "section.carouselText.steps.step02.bullet01",
                    "section.carouselText.steps.step02.bullet02",
                    "section.carouselText.steps.step02.bullet03",
                ]
            },
            {
                "title": "section.carouselText.steps.step03.title",
                "bullets": [
                    "section.carouselText.steps.step03.bullet01",
                    "section.carouselText.steps.step03.bullet02",
                    "section.carouselText.steps.step03.bullet03",
                ]
            },
        ],
        "cssClass": "section-carousel-bullet-icon"
    };
    const SectionFaq = {
        "text": {
            "title": "section.faq.title",
            "paragraph": "section.faq.description"
        },
        "buttons": [
            {
                text: "ui.buttons.chatAssistant",
                cssClass: "btn-solid-red",
                onClick: "openChat:open",
            }
        ],
        "faqs": [
            {
                question: 'section.faq.questions.howLong.question',
                answer: 'section.faq.questions.howLong.answer'
            },
            {
                question: 'section.faq.questions.responsiveDesign.question',
                answer: 'section.faq.questions.responsiveDesign.answer'
            },
            {
                question: 'section.faq.questions.designChanges.question',
                answer: 'section.faq.questions.designChanges.answer'
            },
            {
                question: 'section.faq.questions.expect30days.question',
                answer: 'section.faq.questions.expect30days.answer'
            }
        ]
    };
    const SectionContactCta02 = {
        "text": {
            "title": "section.contact.title",
            "paragraph": "section.contact.description",
        },
        "buttons": [
            {
                text: "ui.buttons.formular",
                cssClass: "btn-solid-light btn-inner-shadow",
                onClick: "openChat:lead",
            }
        ],
        "image": {
            image: ImgContactCta,
            alt: "Delicious pizza",
            text: "Try our new Margherita",
            cta: "Contact us now!",
            link: "/contact",
            width: 834,
            height: 450,
        }
    };

    return (
        <div className="page page-home">
            <ComponentHero text={SectionHero.text} slides={SectionHero.slides} buttons={SectionHero.buttons} />
            <ComponentCards cardsData={SectionCardsFeatures01.cardsData} />
            <ComponentCards intro={SectionIndustries.intro} cardsData={SectionIndustries.cardsData} cssClass={SectionIndustries.cssClass} />
            <ComponentTabs title={SectionDinningExperience.title} tabs={SectionDinningExperience.tabs} tabsContent={SectionDinningExperience.tabsContent} />
            <ComponentCards cardsData={SectionCardsFeatures02.cardsData} />
            <ComponentTabs tabs={SectionMultiTabs.tabs} tabsContent={SectionMultiTabs.tabsContent} cssClass={SectionMultiTabs.cssClass} backgroundOverflow={SectionMultiTabs.backgroundOverflow} />
            <ComponentCarouselText title={SectionBenefits.title} content={SectionBenefits.content} cssClass={SectionBenefits.cssClass} />
            <ComponentContactCTA text={SectionContactCta01.text} buttons={SectionContactCta01.buttons} image={SectionContactCta01.image} cssClass={SectionContactCta01.cssClass} backgroundOverflow={SectionContactCta01.backgroundOverflow}/>
            <ComponentCarouselText title={SectionReviews.title} content={SectionReviews.content} />
            <ComponentTabs tabs={SectionTest30Days.tabs} tabsContent={SectionTest30Days.tabsContent} cssClass={SectionTest30Days.cssClass}/>
            <ComponentCarouselText title={SectionSteps.title} content={SectionSteps.content} cssClass={SectionSteps.cssClass} />
            <ComponentFaq text={SectionFaq.text} buttons={SectionFaq.buttons} faqs={SectionFaq.faqs} />
            <ComponentContactCTA text={SectionContactCta02.text} buttons={SectionContactCta02.buttons} image={SectionContactCta02.image} cssClass={SectionContactCta02.cssClass} backgroundOverflow={SectionContactCta02.backgroundOverflow}/>
        </div>
    )
}

export default Home