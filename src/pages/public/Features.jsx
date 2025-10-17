// Import styles and libraries
import '../../App.scss';
// Import components
import ComponentHero from "../../components/sections/Hero";
import ComponentCards from "../../components/sections/Cards";
import ComponentTabs from "../../components/sections/Tabs";
import ComponentCarouselText from "../../components/sections/CarouselText";
import ComponentContactCTA from "../../components/sections/ContactCTA";
import ComponentFaq from "../../components/sections/Faq";
// Import icons & images
import ImgHero01 from "../../assets/img/hero-features.jpg";

import ImgQrCode from "../../assets/img/qr-code.webp";
import ImgResponsive from "../../assets/img/responsive.webp";
import ImgGiftCart from "../../assets/img/gift-card.webp";
import ImgUxResponsive from "../../assets/img/ux-friendly.webp";
import ImgMultilingual from "../../assets/img/multilingual.webp";
import ImgCommission from "../../assets/img/commission.webp";

import ImgQrCodePhone from "../../assets/img/qr-code-phone.png";

import ImgViewText from "../../assets/img/feature-view-text.png";
import ImgViewImage from "../../assets/img/feature-view-image.png";
import ImgViewVideo from "../../assets/img/feature-view-video.png";

import ImgCalendar from "../../assets/img/calendar.png";

import ImgManagement from "../../assets/img/management.png";
import ImgCustomizable from "../../assets/img/3d-brainstorming.png";
import ImgEngagement from "../../assets/img/engagement.png";

import ImgContactCta from '../../assets/img/contact-cta.webp';


import IconChains from "../../assets/img/icon-chains.svg";
import IconGastro from "../../assets/img/icon-gastro-market.svg";
import IconHotels from "../../assets/img/icon-hotels.svg";
import IconRestaurant from "../../assets/img/icon-restaurant.svg";
import ImgDataOwnership from "../../assets/img/data-ownership.webp";
import ImgAbTesting from "../../assets/img/ab-testing.webp";
import ImgCustomization from "../../assets/img/customization.webp";
import ImgTableTurnOver from "../../assets/img/table-turnover.webp";




const Features = () => {

    const SectionHero = {
        "text": {
            "intro": "section.hero.features.intro",
            "title": "section.hero.features.title",
            "subtitle": "section.hero.features.subtitle",
            // "claimer": "section.hero.features.claimer",
            "bullets": [
                "section.hero.common.bullets.loading",
                "section.hero.common.bullets.engagement",
                "section.hero.common.bullets.onlinePresence",
                "section.hero.common.bullets.streamline",
                "section.hero.common.bullets.grow"
            ]
        },
        "slides": [
            {
                image: ImgHero01,
                alt: "Delicious pizza",
                width: 834,
                height: 450,
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
    const SectionFeatureQrCode = {
        "tabs": false,
        "tabsContent": [
            {
                "title": "section.tabs.qrCode.title",
                "bullets": [
                    "section.tabs.qrCode.bullets.01",
                    "section.tabs.qrCode.bullets.02",
                    "section.tabs.qrCode.bullets.03",
                    "section.tabs.qrCode.bullets.04",
                    "section.tabs.qrCode.bullets.05",
                    "section.tabs.qrCode.bullets.06",
                ],
                "image": {
                    "src": ImgQrCodePhone,
                    "alt": "Description",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.qrCodes",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        to: "/qrcodes"
                    }
                ]
            }
        ],
        "cssClass": "section-overflow-background section-tabs-bullet-icon",
        "backgroundOverflow": "background-base-200"
    }
    const SectionFeaturesView = {
        "intro": {
            "title": "section.cards.intro.featureViews.title",
            "description": "section.cards.intro.featureViews.description",
        },
        "cardsData": [
            {
            "id": 1,
            "isOnClick": true,
            "text": "section.cards.viewImage.title",
            "description": "section.cards.viewImage.description",
            "image": ImgViewImage,
            },
            {
            "id": 2,
            "isOnClick": true,
            "text": "section.cards.viewVideo.title",
            "description": "section.cards.viewVideo.description",
            "image": ImgViewVideo,
            },
            {
            "id": 3,
            "isOnClick": true,
            "text": "section.cards.viewText.title",
            "description": "section.cards.viewText.description",
            "image": ImgViewText,
            }
        ]
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
                        text: "ui.buttons.demo",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        to: "/demos"
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
                        text: "ui.buttons.promo",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        onClick: "openChat:trial",
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
                    "src": ImgGiftCart,
                    "alt": "Digital loyalty card on a phone",
                    "width": 300,
                    "height": 300,
                },
                "buttons": [
                    {
                        text: "ui.buttons.chatbot",
                        cssClass: "btn-solid-red btn-hover-gradient-red",
                        onClick: "openChat:open",
                    }
                ]
            },
        ],
        "cssClass": "section-overflow-background section-tabs-bullet-icon",
        "backgroundOverflow": "background-base-200"
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

    return (
        <div className='page page-home'>
            <ComponentHero text={SectionHero.text} slides={SectionHero.slides} buttons={SectionHero.buttons} />
            <ComponentCards cardsData={SectionCardsFeatures01.cardsData} />
            <ComponentTabs tabs={SectionFeatureQrCode.tabs} tabsContent={SectionFeatureQrCode.tabsContent} cssClass={SectionFeatureQrCode.cssClass} backgroundOverflow={SectionFeatureQrCode.backgroundOverflow}/>
            <ComponentCards intro={SectionFeaturesView.intro} cardsData={SectionFeaturesView.cardsData} />
            <ComponentTabs tabs={SectionTest30Days.tabs} tabsContent={SectionTest30Days.tabsContent} cssClass={SectionTest30Days.cssClass}/>
            <ComponentTabs tabs={SectionMultiTabs.tabs} tabsContent={SectionMultiTabs.tabsContent} cssClass={SectionMultiTabs.cssClass} backgroundOverflow={SectionMultiTabs.backgroundOverflow} />
            <ComponentCarouselText title={SectionReviews.title} content={SectionReviews.content} />
            <ComponentContactCTA text={SectionContactCta01.text} buttons={SectionContactCta01.buttons} image={SectionContactCta01.image} cssClass={SectionContactCta01.cssClass} backgroundOverflow={SectionContactCta01.backgroundOverflow}/>

        </div>
    )
}

export default Features