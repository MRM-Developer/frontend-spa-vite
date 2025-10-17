// Import styles and libraries
import '../../App.scss';
// Import components
import ComponentHero from "../../components/sections/Hero";
import ComponentPricing from "../../components/sections/PricingTabs";
import ComponentPromoBanner from '../../components/sections/PromoBannerLoop';
import ComponentTabs from "../../components/sections/Tabs";
// Import icons & images
import ImgHero01 from "../../assets/img/mobile-payment-illustration.jpg";
import ImgCalendar from "../../assets/img/calendar.png";


const Pricing = () => {
    const SectionHero = {
        "text": {
            "intro": "section.hero.pricing.intro",
            "title": "section.hero.pricing.title",
            "subtitle": "section.hero.pricing.subtitle",
            "bullets": [
                "section.hero.common.bullets.transparent",
                "section.hero.common.bullets.commission",
                "section.hero.common.bullets.flexible",
                "section.hero.common.bullets.customDomain",
                "section.hero.common.bullets.support"
            ]
        },
        "slides": [
            {
                image: ImgHero01,
                alt: "Delicious pizza",
                width: 834,
                height: 450,
            }
        ],
        "buttons": [
            {
                text: "ui.buttons.promo",
                cssClass: "btn-solid-red btn-hover-gradient-red",
                onClick: "openChat:trial",
            }
        ]
    }
    const SectionPromo = {
        "text": "section.promo.setupFree",
    }
        const SectionRestaurantPricing = {
            "intro": {
                "title": "section.pricing.restaurants.intro.title",
                "description": "section.pricing.restaurants.intro.description"
            },
            "cardsData": [
                {
                    "title": "section.pricing.restaurants.plan01.title",
                    "description": "section.pricing.restaurants.plan01.description",
                    "price": {
                        "monthly": "section.pricing.restaurants.plan01.price.monthly",
                        "annual": "section.pricing.restaurants.plan01.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multilingual2",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                    ],
                    "featureNotIncluded": [
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ]
                },
                {
                    "title": "section.pricing.restaurants.plan02.title",
                    "description": "section.pricing.restaurants.plan02.description",
                    "price": {
                        "monthly": "section.pricing.restaurants.plan02.price.monthly",
                        "annual": "section.pricing.restaurants.plan02.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multilingual2",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                    ],
                    "featureNotIncluded": [
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ]
                },
                {
                    "cssClass": "highlighted",
                    "title": "section.pricing.restaurants.plan03.title",
                    "description": "section.pricing.restaurants.plan03.description",
                    "price": {
                        "monthly": "section.pricing.restaurants.plan03.price.monthly",
                        "annual": "section.pricing.restaurants.plan03.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multilingual4",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                    ],
                    "featureNotIncluded": [
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ]
                },
                {
                    "title": "section.pricing.restaurants.plan04.title",
                    "description": "section.pricing.restaurants.plan04.description",
                    "price": {
                        "monthly": "section.pricing.restaurants.plan04.price.monthly",
                        "annual": "section.pricing.restaurants.plan04.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multilingual6",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ],
                    "featureNotIncluded": [
                    ]
                },
            ]
        }
        const SectionRestaurantChainPricing = {
            "intro": {
                "title": "section.pricing.restaurantChains.intro.title",
                "description": "section.pricing.restaurantChains.intro.description"
            },
            "cardsData": [
                {
                    "title": "section.pricing.restaurantChains.plan01.title",
                    "description": "section.pricing.restaurantChains.plan01.description",
                    "price": {
                        "monthly": "section.pricing.restaurantChains.plan01.price.monthly",
                        "annual": "section.pricing.restaurantChains.plan01.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multiLocation",
                        "section.pricing.common.centralDashboard",
                        "section.pricing.common.multilingual2",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                    ],
                    "featureNotIncluded": [
                        "section.pricing.common.branchManagement",
                        "section.pricing.common.sharedLoyalty",
                        "section.pricing.common.bulkDiscounts",
                        "section.pricing.common.chainAnalytics",
                        "section.pricing.common.images",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ]
                },
                {
                    "title": "section.pricing.restaurantChains.plan02.title",
                    "description": "section.pricing.restaurantChains.plan02.description",
                    "price": {
                        "monthly": "section.pricing.restaurantChains.plan02.price.monthly",
                        "annual": "section.pricing.restaurantChains.plan02.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multiLocation",
                        "section.pricing.common.centralDashboard",
                        "section.pricing.common.branchManagement",
                        "section.pricing.common.multilingual2",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                    ],
                    "featureNotIncluded": [
                        "section.pricing.common.sharedLoyalty",
                        "section.pricing.common.bulkDiscounts",
                        "section.pricing.common.chainAnalytics",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ]
                },
                {
                    "cssClass": "highlighted",
                    "title": "section.pricing.restaurantChains.plan03.title",
                    "description": "section.pricing.restaurantChains.plan03.description",
                    "price": {
                        "monthly": "section.pricing.restaurantChains.plan03.price.monthly",
                        "annual": "section.pricing.restaurantChains.plan03.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multiLocation",
                        "section.pricing.common.centralDashboard",
                        "section.pricing.common.branchManagement",
                        "section.pricing.common.sharedLoyalty",
                        "section.pricing.common.multilingual4",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                    ],
                    "featureNotIncluded": [
                        "section.pricing.common.bulkDiscounts",
                        "section.pricing.common.chainAnalytics",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ]
                },
                {
                    "title": "section.pricing.restaurantChains.plan04.title",
                    "description": "section.pricing.restaurantChains.plan04.description",
                    "price": {
                        "monthly": "section.pricing.restaurantChains.plan04.price.monthly",
                        "annual": "section.pricing.restaurantChains.plan04.price.annual"
                    },
                    "featureIncluded": [
                        "section.pricing.common.multiLocation",
                        "section.pricing.common.centralDashboard",
                        "section.pricing.common.branchManagement",
                        "section.pricing.common.sharedLoyalty",
                        "section.pricing.common.bulkDiscounts",
                        "section.pricing.common.chainAnalytics",
                        "section.pricing.common.multilingual6",
                        "section.pricing.common.qrCode",
                        "section.pricing.common.customization",
                        "section.pricing.common.url",
                        "section.pricing.common.images",
                        "section.pricing.common.video",
                        "section.pricing.common.booking",
                        "section.pricing.common.giftCard",
                        "section.pricing.common.clientSignIn",
                        "section.pricing.common.popUp",
                        "section.pricing.common.emailMarketing",
                    ],
                    "featureNotIncluded": [
                    ]
                },
            ]
        }
    const pricingData = {
        "restaurants": SectionRestaurantPricing,
        "restaurantChains": SectionRestaurantChainPricing,
        "cssClass": "section-overflow-background section-tabs-bullet-icon",
        "backgroundOverflow": "background-gradient-light-diagonal"
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


    return (
            <div className='page page-pricing'>
                <ComponentHero text={SectionHero.text} slides={SectionHero.slides} buttons={SectionHero.buttons} />
                <ComponentPromoBanner text={SectionPromo.text}/>
                <ComponentPricing pricingData={pricingData} cssClass={pricingData.cssClass} backgroundOverflow={pricingData.backgroundOverflow} />
                <ComponentTabs tabs={SectionTest30Days.tabs} tabsContent={SectionTest30Days.tabsContent} cssClass={SectionTest30Days.cssClass}/>
            </div>
    )
}

export default Pricing