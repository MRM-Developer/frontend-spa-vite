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
import ImgContactCta from '../../assets/img/contact-cta.webp';
import ImgCalendar from "../../assets/img/calendar.png";
import ImgHero01 from "../../assets/img/hero-demo-pizza.jpg";
import ImgHero02 from "../../assets/img/hero-demo-market.jpg";

import ImgCommission from "../../assets/img/commission.webp";
import ImgGiftCart from "../../assets/img/gift-card.webp";
import ImgMultilingual from "../../assets/img/multilingual.webp";
import ImgQrCode from "../../assets/img/qr-code.webp";
import ImgResponsive from "../../assets/img/responsive.webp";
import ImgUxResponsive from "../../assets/img/ux-friendly.webp";


const Demos = () => {

    const SectionHero = {
        "text": {
            "intro": "section.hero.demos.intro",
            "title": "section.hero.demos.title",
            "subtitle": "section.hero.demos.subtitle",
            "bullets": [
                "section.hero.common.bullets.interactive",
                "section.hero.common.bullets.multilanguage",
                "section.hero.common.bullets.switchMode",
                "section.hero.common.bullets.addsOn",
                "section.hero.common.bullets.loading",
            ]
        },
        "slides": [
            {
                image: ImgHero01,
                alt: "DEMO for the menu of a Pizzeria restaurant",
                text: "Visit the demo for the menu of a Pizzeria restaurant",
                cta: "ui.buttons.demoPiza",
                link: "/",
                width: 834,
                height: 450,
            },
            {
                image: ImgHero02,
                alt: "DEMO for the menu of a food market place",
                text: "Visit the demo for the menu of a food market place",
                cta: "ui.buttons.demoMarket",
                link: "/contact",
                width: 834,
                height: 450,
            }
        ],
        "buttons": [
            {
                text: "ui.buttons.demoPiza",
                cssClass: "btn-solid-red btn-hover-gradient-red",
                onClick: "openChat",
            },
            {
                text: "ui.buttons.demoMarket",
                cssClass: "btn-solid-red btn-hover-gradient-red",
                onClick: "openChat",
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
    const SectionFaq = {
        "text": {
            "title": "FAQ",
            "paragraph": "You can either fill a formular so we come back to you with a tailored service for your requirements. Or you can direct call or contact our founder."
        },
        "buttons": [
            {
                text: "Chat live with Diego's assistant",
                cssClass: "btn-solid-red",
                onClick: "openChat",
            }
        ],
        "faqs": [
            {
                question: 'section.faq.questions.updateMyself.question',
                answer: 'section.faq.questions.updateMyself.answer'
            },
            {
                question: 'section.faq.questions.appDownload.question',
                answer: 'section.faq.questions.appDownload.answer'
            },
            {
                question: 'section.faq.questions.customerSupport.question',
                answer: 'section.faq.questions.customerSupport.answer'
            },
            {
                question: 'section.faq.questions.secure.question',
                answer: 'section.faq.questions.secure.answer'
            }
        ]
    };
    const SectionContactCta01 = {
        "text": {
            "title": "Do you have any more questions?",
            "paragraph": "You can fill out our quick form and we’ll get back to you with a tailored solution. Prefer a direct conversation? Call or reach out to our founder personally.",
        },
        "buttons": {
            "text": "Fill out the form here",
            "to": "contact"
        },
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
        <div className='page page-demos'>
            <ComponentHero text={SectionHero.text} slides={SectionHero.slides} buttons={SectionHero.buttons} />
            <ComponentCards cardsData={SectionCardsFeatures01.cardsData} />
            <ComponentFaq text={SectionFaq.text} buttons={SectionFaq.buttons} faqs={SectionFaq.faqs} />
            <ComponentContactCTA text={SectionContactCta01.text} buttons={SectionContactCta01.buttons} image={SectionContactCta01.image} />
        </div>
    )
}

export default Demos