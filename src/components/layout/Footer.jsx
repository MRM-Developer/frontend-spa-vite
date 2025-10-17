//Import styles and libraries
import '../../styles/com-la.footer.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import icons & images
import LogoSymbol from '../../assets/img/logo-symbol.svg';

const Footer = () => {
    // States for translations
    const { t } = useTranslation();

    // Render company links
    const RenderCompanyLinks = () => {
        return (
            <div className='nav-group'>
                <p className='font-bold'>Company</p>
                <div className='nav-links'>
                    <NavLink className='tab' to='/about'>{t('nav.about')}</NavLink>
                    <NavLink className='tab' to='/contact'>{t('nav.contact')}</NavLink>
                    <NavLink className='tab' to='/status'>{t('nav.status')}</NavLink>
                    <NavLink className='tab' to='/partners'>{t('nav.partners')}</NavLink>
                    <NavLink className='tab' to='/cookiespolicy'>{t('nav.cookies')}</NavLink>
                    <NavLink className='tab' to='/privacypolicy'>{t('nav.privacy')}</NavLink>
                    <NavLink className='tab' to='/termsofservice'>{t('nav.termsOfService')}</NavLink>
                    <NavLink className='tab' to='/legalnotice'>{t('nav.legalNotice')}</NavLink>
                </div>
            </div>
        )
    }
    // Render ressources links
    const RenderRessourcesLinks = () => {
        return (
            <div className='nav-group'>
                <p className='font-bold'>Ressources</p>
                <div className='nav-links'>
                    <NavLink className='tab' to='/academy'>{t('nav.academy')}</NavLink>
                    <NavLink className='tab' to='/faq'>{t('nav.faq')}</NavLink>
                    <NavLink className='tab' to='/blogs'>{t('nav.blog')}</NavLink>
                    <NavLink className='tab' to='/salesconsultant'>{t('nav.sales')}</NavLink>
                </div>
            </div>
        )
    }
    // Render demos links
    const RenderDemosLinks = () => {
        return (
            <div className='nav-group'>
                <p className='font-bold'>Demos</p>
                <div className='nav-links'>
                    <NavLink className='tab' to='/'>{t('nav.demoPizza')}</NavLink>
                    <NavLink className='tab' to='/'>{t('nav.demoMarket')}</NavLink>
                </div>
            </div>
        )
    }
    // Render services links
    const RenderServicesLinks = () => {
        return (
            <div className='nav-group'>
                <p className='font-bold'>Service</p>
                <div className='nav-links'>
                    <NavLink className='tab' to='/pricing'>{t('nav.pricing')}</NavLink>
                    <NavLink className='tab' to='/addson'>{t('nav.addsOn')}</NavLink>
                    <NavLink className='tab' to='/features'>{t('nav.features')}</NavLink>
                    <NavLink className='tab' to='/qrcodes'>{t('nav.qrCodes')}</NavLink>
                    <NavLink className='tab' to='/smartmarket'>{t('nav.smartMarket')}</NavLink>
                    <NavLink className='tab' to='/'>{t('nav.signIn')}</NavLink>
                    <NavLink className='tab' to='/'>{t('nav.signUp')}</NavLink>
                </div>
            </div>
        )
    }

    return (
        <div className='footer' role='contentinfo'>
            <NavLink className='tab'>
                <img className='logo' src={LogoSymbol} alt='logo My Restaurant Menu App' title='My Restaurant Menu logo in color red' width='' height='' />
            </NavLink>
            <div className='nav-container'>
                {RenderCompanyLinks()}
                {RenderRessourcesLinks()}
                {RenderDemosLinks()}
                {RenderServicesLinks()}
            </div>
        </div>
    )
}

export default Footer