import { useState, useRef, useEffect } from "react";
import { isEmailValid, isPhoneValid } from './validate';
import { useTranslation } from "react-i18next";

export default function LeadForm({ onSubmit, onCancel, prefill = {}, autoFocus = true }) {
    const { t } = useTranslation();

    const [name, setName] = useState(prefill.name || "");
    const [email, setEmail] = useState(prefill.email || "");
    const [phone, setPhone] = useState(prefill.phone || "");

    const firstFieldRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
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
        // now all fields are required
        const nameValid = name && name.trim().length > 0;
        const emailValid = email && isEmailValid(email);
        const phoneValid = phone && isPhoneValid(phone);
        if (!nameValid || !emailValid || !phoneValid) {
            setTouched({ name: true, email: true, phone: true });
            setFormError('Please fix the highlighted fields before sending');
            // focus first invalid
            if (!nameValid && nameRef.current) {
                nameRef.current.focus();
            } else if (!emailValid && emailRef.current) {
                emailRef.current.focus();
            } else if (!phoneValid && phoneRef.current) {
                phoneRef.current.focus();
            }
            return;
        }
        setFormError('');
        onSubmit({ name, email, phone });
    }

    function onBlur(field) {
        setTouched(prev => ({ ...prev, [field]: true }));
    }

    // global form error visible in footer
    const [formError, setFormError] = useState('');

    return (
        <form className="form-container message" onSubmit={handleSubmit}>
            <label htmlFor="lead_name">{t("forms.nameLabel")}</label>
            <input id="lead_name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("forms.namePlaceholder")} ref={(el) => { nameRef.current = el; firstFieldRef.current = el; }} autoComplete="name" onBlur={() => onBlur('name')} aria-invalid={(touched.name || attemptedSubmit) && !name} />
            {(touched.name || attemptedSubmit) && (!name) && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <label htmlFor="lead_email">{t("forms.emailLabel")}</label>
            <input id="lead_email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("forms.emailPlaceholder")} autoComplete="email" onBlur={() => onBlur('email')} ref={emailRef} aria-invalid={(touched.email || attemptedSubmit) && (!email || !isEmailValid(email))} />
            {(touched.email || attemptedSubmit) && (!email || !isEmailValid(email)) && (
                <div className="form-error">{!email ? (t("forms.required") || 'This field is required') : (t("forms.invalidEmail") || 'Please enter a valid email')}</div>
            )}

            <label htmlFor="lead_phone">{t("forms.phoneLabel")}</label>
            <input id="lead_phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("forms.phonePlaceholder")} autoComplete="tel" onBlur={() => onBlur('phone')} ref={phoneRef} aria-invalid={(touched.phone || attemptedSubmit) && (!phone || !isPhoneValid(phone))} />
            {(touched.phone || attemptedSubmit) && (!phone || !isPhoneValid(phone)) && (
                <div className="form-error">{!phone ? (t("forms.required") || 'This field is required') : (t("forms.invalidPhone") || 'Please enter a valid phone number')}</div>
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
