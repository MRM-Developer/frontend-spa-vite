import { useState, useRef, useEffect } from "react";
import { isEmailValid, isPhoneValid } from './validate';
import { useTranslation } from "react-i18next";

export default function TrialForm({ onSubmit, onCancel, prefill = {}, autoFocus = true }) {
    const { t } = useTranslation();

    const [name, setName] = useState(prefill.name || "");
    const [email, setEmail] = useState(prefill.email || "");
    const [phone, setPhone] = useState(prefill.phone || "");
    const [restaurantName, setRestaurantName] = useState(prefill.restaurantName || "");
    const [restaurantLocation, setRestaurantLocation] = useState(prefill.phone || "");
    const [menuType, setMenuType] = useState(prefill.phone || "");
    const [restaurantType, setRestaurantType] = useState(prefill.phone || "");


    const firstFieldRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const restaurantNameRef = useRef(null);
    const restaurantLocationRef = useRef(null);
    const menuTypeRef = useRef(null);
    const restaurantTypeRef = useRef(null);
    const [touched, setTouched] = useState({ name: false, email: false, phone: false });
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    useEffect(() => {
        // focus the first field when the form mounts
        if (autoFocus && firstFieldRef.current) {
            firstFieldRef.current.focus();
        }
    }, [autoFocus]);

    function handleSubmit(e) {
        e.preventDefault();
        setAttemptedSubmit(true);
        const nameValid = name && name.trim().length > 0;
        const emailValid = email && isEmailValid(email);
        const phoneValid = phone && isPhoneValid(phone);
        const restaurantNameValid = restaurantName && restaurantName.trim().length > 0;
        const restaurantLocationValid = restaurantLocation && restaurantLocation.trim().length > 0;
        const menuTypeValid = menuType && menuType.trim().length > 0;
        const restaurantTypeValid = restaurantType && restaurantType.trim().length > 0;
        if (!nameValid || !emailValid || !phoneValid || !restaurantNameValid || !restaurantLocationValid || !menuTypeValid || !restaurantTypeValid) {
            setTouched({ name: true, email: true, phone: true });
            setFormError('Please fix the highlighted fields before sending');
            // focus first invalid
            if (!nameValid && nameRef.current) nameRef.current.focus();
            else if (!emailValid && emailRef.current) emailRef.current.focus();
            else if (!phoneValid && phoneRef.current) phoneRef.current.focus();
            else if (!restaurantNameValid && restaurantNameRef.current) restaurantNameRef.current.focus();
            else if (!restaurantLocationValid && restaurantLocationRef.current) restaurantLocationRef.current.focus();
            else if (!menuTypeValid && menuTypeRef.current) menuTypeRef.current.focus();
            else if (!restaurantTypeValid && restaurantTypeRef.current) restaurantTypeRef.current.focus();
            return;
        }
        setFormError('');
        onSubmit({ name, email, phone });
    }

    function onBlur(field) {
        setTouched(prev => ({ ...prev, [field]: true }));
    }

    const [formError, setFormError] = useState('');

    return (
        <form className="form-container message" onSubmit={handleSubmit}>
            <label htmlFor="trial_name">{t("forms.nameLabel")}</label>
            <input id="trial_name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("forms.namePlaceholder")} ref={(el) => { nameRef.current = el; firstFieldRef.current = el; }} autoComplete="name" onBlur={() => onBlur('name')} aria-invalid={(touched.name || attemptedSubmit) && !name} />
            {(touched.name || attemptedSubmit) && (!name) && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <label htmlFor="trial_email">{t("forms.emailLabel")}</label>
            <input id="trial_email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("forms.emailPlaceholder")} autoComplete="email" onBlur={() => onBlur('email')} ref={emailRef} aria-invalid={(touched.email || attemptedSubmit) && (!email || !isEmailValid(email))} />
            {(touched.email || attemptedSubmit) && (!email || !isEmailValid(email)) && (
                <div className="form-error">{!email ? (t("forms.required") || 'This field is required') : (t("forms.invalidEmail") || 'Please enter a valid email')}</div>
            )}

            <label htmlFor="trial_phone">{t("forms.phoneLabel")}</label>
            <input id="trial_phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("forms.phonePlaceholder")} autoComplete="tel" onBlur={() => onBlur('phone')} ref={phoneRef} aria-invalid={(touched.phone || attemptedSubmit) && (!phone || !isPhoneValid(phone))} />
            {(touched.phone || attemptedSubmit) && (!phone || !isPhoneValid(phone)) && (
                <div className="form-error">{!phone ? (t("forms.required") || 'This field is required') : (t("forms.invalidPhone") || 'Please enter a valid phone number')}</div>
            )}

            <label htmlFor="trial_restaurantName">{t("forms.restaurantNameLabel")}</label>
            <input id="trial_restaurantName" name="restaurantName" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} placeholder={t("forms.restaurantNamePlaceholder")} autoComplete="organization" onBlur={() => onBlur('restaurantName')} ref={restaurantNameRef} aria-invalid={(touched.restaurantName || attemptedSubmit) && !restaurantName} />
            {(touched.restaurantName || attemptedSubmit) && !restaurantName && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <label htmlFor="trial_location">{t("forms.locationLabel")}</label>
            <input id="trial_location" name="restaurantLocation" value={restaurantLocation} onChange={(e) => setRestaurantLocation(e.target.value)} placeholder={t("forms.locationPlaceholder")} autoComplete="street-address" onBlur={() => onBlur('restaurantLocation')} ref={restaurantLocationRef} aria-invalid={(touched.restaurantLocation || attemptedSubmit) && !restaurantLocation} />
            {(touched.restaurantLocation || attemptedSubmit) && !restaurantLocation && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <label htmlFor="trial_menuType">{t("forms.menuTypeLabel")}</label>
            <input id="trial_menuType" name="menuType" value={menuType} onChange={(e) => setMenuType(e.target.value)} placeholder={t("forms.menuTypePlaceholder")} onBlur={() => onBlur('menuType')} ref={menuTypeRef} aria-invalid={(touched.menuType || attemptedSubmit) && !menuType} />
            {(touched.menuType || attemptedSubmit) && !menuType && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <label htmlFor="trial_restaurantType">{t("forms.restaurantTypeLabel")}</label>
            <input id="trial_restaurantType" name="restaurantType" value={restaurantType} onChange={(e) => setRestaurantType(e.target.value)} placeholder={t("forms.restaurantTypePlaceholder")} onBlur={() => onBlur('restaurantType')} ref={restaurantTypeRef} aria-invalid={(touched.restaurantType || attemptedSubmit) && !restaurantType} />
            {(touched.restaurantType || attemptedSubmit) && !restaurantType && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <footer>
                {formError && (
                    <div className="form-error-global" role="alert" aria-live="polite">{formError}</div>
                )}
                <div className="buttons-container">
                    <button className="btn-solid-red btn-full-width" type="submit">{t("forms.submit")}</button>
                    <button className="btn-solid-dark btn-full-width" type="button" onClick={onCancel}>{t("forms.cancel")}</button>
                </div>
            </footer>
        </form>
    );
}
