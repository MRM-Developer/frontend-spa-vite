// Import styles and libraries
import '../../App.scss';
// Import components
import ComponentFaq from "../../components/sections/Faq";


const Faq = () => {

    const SectionFaq = {
        "text": {
            "title": "section.faq.title",
            "paragraph": "section.faq.description"
        },
        "buttons": [
            {
                text: "ui.buttons.chatAssistant",
                cssClass: "btn-solid-red",
                onClick: "openChat",
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
            },
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

    return (
        <div className='page page-faq'>
            <ComponentFaq text={SectionFaq.text} buttons={SectionFaq.buttons} faqs={SectionFaq.faqs} />
        </div>
    )
}

export default Faq