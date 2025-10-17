// Import styles and libraries
import '../../styles/com-se.tabs.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Import hooks
import useButtonChatActions from '../../hooks/useButtonChatActions';
// import { useChatActions } from '../../hooks/useChatActions';
// Import components
import Button from '../ui/Button';
// Import forms
import LeadForm from '../chatbot/forms/LeadForm';
import TrialForm from '../chatbot/forms/TrialForm';
// Images and icons
import { IconCheck } from '../../components/ui/Icons';


const Tabs = ({title, tabs, tabsContent, cssClass, backgroundOverflow}) => {
    // States for translations
    const { t } = useTranslation();

    // // Use hook chat actions
    // const { openChat } = useChatActions();
    // Use hook chat button actions
    const { mapButtons } = useButtonChatActions();

    // State to track which tab is currently active (index-based)
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    // Get the currently active content based on the active tab index
    const activeContent = tabsContent && tabsContent[activeTabIndex];

    // Function to handle tab click
    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    // Render tabs
    const renderTabs = () => {
        return (
            <ul className='tabs-container' >
                {tabsContent.map((content, index) => (
                    <li
                        key={index}
                        className={`tab ${activeTabIndex === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        {t(content.title)}
                    </li>
                ))}
            </ul>
        )
    }

    // Render bullets
    const renderBullets = () => {
        return (
            <>
                {activeContent.title && !tabs ?
                    <h3 className='title'>{t(activeContent.title)}</h3>
                    : null
                }
                <ul className='bullets-container'>
                    {Object.entries(activeContent.bullets).map(([key, bullet]) => (
                        <li className='bullet' key={key}>
                            <IconCheck className='icon' /> {t(bullet)}
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    // Render buttons
    const renderButtons = () => {
        return (
            <div className='buttons-container'>
                {mapButtons(activeContent.buttons).map(({ key, text, cssClass, to, onClick, icon, ariaLabel }) => (
                    <Button
                        key={key}
                        text={text}
                        cssClass={cssClass}
                        to={to}
                        onClick={onClick}
                        icon={icon}
                        aria-label={ariaLabel}
                    />
                ))}
            </div>
        )
    }

    // Render image
    const renderImage = () => {
        return (
            <div className='image-container'>
                <img
                    src={activeContent.image.src || activeContent.image}
                    alt={activeContent.image.alt || 'Image'}
                    width={activeContent.image?.width}
                    height={activeContent.image?.height}
                />
            </div>
        )
    }

    // Render form
    const renderForm = () => {
        if (activeContent.form === "lead") {
            return (
                <>
                    <LeadForm
                        onSubmit={(data) => console.log("Lead form submitted", data)}
                        onCancel={() => console.log("Form cancelled")}
                        autoFocus={false}
                    />
                </>
            );
        } else if (activeContent.form === "trial") {
            return (
                <>
                    <TrialForm
                        onSubmit={(data) => console.log("Trial form submitted", data)}
                        onCancel={() => console.log("Form cancelled")}
                        autoFocus={false}
                    />
                </>
            );
        }
        return null;
    };

    // Render overflow background
    const renderBackgroundOverflow = () => {
        return (
            <div className={`${backgroundOverflow}`}></div>
        )
    }


    return (
        <section className={`section section-tabs ${cssClass}`} >
            {backgroundOverflow && renderBackgroundOverflow()}
            {title && <h3 className='title'>{t(title)}</h3> }
            {tabs && tabsContent && renderTabs()}
            <div className='content-container'>
                <div className='text-container'>
                    {activeContent && activeContent.bullets && renderBullets()}
                    {activeContent && activeContent.buttons && renderButtons()}
                </div>
                {activeContent.form ? renderForm() : activeContent.image && renderImage()}
            </div>
        </section>
    )
}

export default Tabs