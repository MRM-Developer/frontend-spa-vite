// Import styles and libraries
import './../../styles/com-se.pricing.scss';
import { useState } from "react";
import { Trans } from 'react-i18next';
import { useTranslation } from 'react-i18next';
// Import components
import PricingCards from '../ui/PricingCards';
import Button from '../ui/Button';


// State for TABS
const TABS = [
    { key: "restaurants", label: "section.pricing.tabs.restaurants" },
    { key: "restaurantChains", label: "section.pricing.tabs.restaurantChains" },
    { key: "foodMarkets", label: "section.pricing.tabs.foodMarkets" },
    { key: "festivals", label: "section.pricing.tabs.festivals" }
];

const PricingTabs = ({ pricingData, cssClass, backgroundOverflow }) => {
    // States for translations
    const { t } = useTranslation();

    // State for active tab
    const [selectedTab, setSelectedTab] = useState("restaurants");

    // Render tabs buttons
    const renderTabsButtons = () => {
        return (
            <div className="buttons-container tabs-buttons-container" role="tablist" aria-label="Pricing Categories">
                {TABS.map(tab => (
                    <Button
                        key={tab.key}
                        className={selectedTab === tab.key ? "btn-solid-red" : "btn-solid-light btn-inner-shadow"}
                        text={t(tab.label)}
                        onClick={() => setSelectedTab(tab.key)}
                    />
                ))}
            </div>
        )
    }

    // Render overflow background
    const renderBackgroundOverflow = () => {
        return (
            <div className={`${backgroundOverflow}`}></div>
        )
    }

    return (
        <section className={`section section-pricing ${cssClass}`} >
            {backgroundOverflow && renderBackgroundOverflow()}
            <div className="section-title">
                <Trans i18nKey="section.pricing.tabs.title"
                components={{
                    bold: <span className="font-bold" />,
                    boldRed: <strong className="font-red" />
                }}
                />
            </div>
            <div className="section-description">
                <Trans i18nKey="section.pricing.tabs.description"
                components={{
                    bold: <span className="font-bold" />,
                    boldRed: <strong className="font-red" />
                }}
                />
            </div>
            {renderTabsButtons()}
            <hr className='line-red'/>
            {pricingData[selectedTab] ?
                <PricingCards {...pricingData[selectedTab]} />
            :
                <PricingCards {...pricingData.restaurants} />
            }
        </section>
    )
}

export default PricingTabs