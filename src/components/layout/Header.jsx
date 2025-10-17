// Import styles and libraries
import '../../styles/com-la.header.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Import redux & constants
// import { useSelector, useDispatch } from 'react-redux';
import { constantLanguagesActive } from '../../store/constants';
// Import hooks
import useMediaQuery from '../../hooks/useMediaQuery';
// Import components
import Button from '../ui/Button'
// Import icons & images
import { IconBurgerMenu, IconBurgerMenuExpanded, IconLanguage } from '../ui/Icons';
import LogoRed from '../../assets/img/logo-red.svg';


const Header = () => {
    // States for translations
    const { t, i18n } = useTranslation();

    // REDUX States
    // const { isAuthenticated } = useSelector((state) => state.user);
    const isAuthenticated = false;

    //Language state and functions
    const [isLanguages, setIsLanguages] = useState(false);
    // Toggle languages
    const toggleLanguagesBox = () => { setIsLanguages(!isLanguages) };
    // Handle language change
    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsLanguages(false);
    }

    //Navigation state and functions
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsLanguages(false);
    };
    // Close menu and languages
    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsLanguages(false);
    };

    // Declare state for responsive design using custom hook
    const isDesktop = useMediaQuery('(min-width: 786px)');

    // Render navigation
    const renderNavigation = () => {
        return (
            <>
                <NavLink className='tab' onClick={closeMenu} to='/'>{t('nav.home')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='/features'>{t('nav.features')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='/pricing'>{t('nav.pricing')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='/demos'>{t('nav.demo')}</NavLink>
                <NavLink className='tab' onClick={closeMenu} to='/contact'>{t('nav.contact')}</NavLink>
            </>
        )
    }

    // Render burger menu
    const renderBurgerMenu = () => {
        return (
            <>
                <button className='buttonMenu' onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} >
                    {isMenuOpen ? <IconBurgerMenuExpanded className='icon'  /> : <IconBurgerMenu className='icon' />}
                </button>
            </>
        )
    }

    // Render languages
    const renderLanguages = (cssClass) => {
        return (
            <div className={cssClass}>
                {constantLanguagesActive.map(language => (
                        <Button cssClass='language-flag' onClick={() => handleLanguageChange(language.code)} key={language.code} icon={language.flag} />
                    ))
                }
            </div>
        )
    }

    // Render account button
    const renderAccountLink = () => {
        return (
            <>
                {isAuthenticated ?
                    <Button text='nav.signOut' cssClass='tab btn-border-dark' to='/' onClick={closeMenu} />
                    :
                    <Button text='nav.signIn' cssClass='tab btn-solid-red' to='/features' onClick={closeMenu} />
                }
            </>
        )
    }

    return (
        <header className='header' role='banner'>
            <NavLink className='tab' to='/'>
                <img className='logo' src={LogoRed} alt='logo My Restaurant Menu App' title='My Restaurant Menu logo in color red' width='103.7' height='30' />
            </NavLink>
            <div className='nav-group' role='navigation'>
                {isDesktop ? renderNavigation() : null}
                <Button cssClass='language-toggle' onClick={toggleLanguagesBox} icon={<IconLanguage className='icon' />} />
                {isLanguages ? renderLanguages('languages-box') : null}
                {isDesktop ? renderAccountLink() : renderBurgerMenu()}
            </div>
            {isDesktop ? null :
                <nav className={`navContainer ${isMenuOpen ? 'open' : 'closed'}`}>
                    {renderNavigation()}
                    {renderAccountLink()}
                    {renderLanguages('dropdown-languages-box')}
                </nav>
            }
        </header>
    );
}

export default Header;