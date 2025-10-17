import { useState, useRef, useEffect } from "react";
import { isEmailValid } from './validate';
import { useTranslation } from "react-i18next";

export default function RegisterForm({ onSubmit, onCancel, prefill = {}, autoFocus = true }) {
    const { t } = useTranslation();

    const [name, setName] = useState(prefill.name || "");
    const [email, setEmail] = useState(prefill.email || "");
    const [password, setPassword] = useState("");
    const [business, setBusiness] = useState(prefill.business || "");

    const firstFieldRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const businessRef = useRef(null);
    const [touched, setTouched] = useState({ name: false, email: false, password: false, business: false });
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
        const passwordValid = password && password.length >= 6;
        const businessValid = business && business.trim().length > 0;
        if (!nameValid || !emailValid || !passwordValid || !businessValid) {
            setTouched({ name: true, email: true, password: true, business: true });
            setFormError('Please fix the highlighted fields before sending');
            if (!nameValid && nameRef.current) nameRef.current.focus();
            else if (!emailValid && emailRef.current) emailRef.current.focus();
            else if (!passwordValid && passwordRef.current) passwordRef.current.focus();
            else if (!businessValid && businessRef.current) businessRef.current.focus();
            return;
        }
        setFormError('');
        onSubmit({ name, email, password, business });
    }

    function onBlur(field) {
        setTouched(prev => ({ ...prev, [field]: true }));
    }

    const [formError, setFormError] = useState('');

    return (
        <form className="form-container message" onSubmit={handleSubmit}>
            <label htmlFor="register_name">{t("forms.nameLabel")}</label>
            <input id="register_name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("forms.namePlaceholder")} ref={(el) => { nameRef.current = el; firstFieldRef.current = el; }} autoComplete="name" onBlur={() => onBlur('name')} aria-invalid={(touched.name || attemptedSubmit) && !name} />
            {(touched.name || attemptedSubmit) && (!name) && (
                <div className="form-error">{t("forms.required") || 'This field is required'}</div>
            )}

            <label htmlFor="register_email">{t("forms.emailLabel")}</label>
            <input id="register_email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("forms.emailPlaceholder")} autoComplete="email" onBlur={() => onBlur('email')} ref={emailRef} aria-invalid={(touched.email || attemptedSubmit) && (!email || !isEmailValid(email))} />
            {(touched.email || attemptedSubmit) && (!email || !isEmailValid(email)) && (
                <div className="form-error">{!email ? (t("forms.required") || 'This field is required') : (t("forms.invalidEmail") || 'Please enter a valid email')}</div>
            )}

            <label htmlFor="register_password">{t("forms.passwordLabel")}</label>
            <input id="register_password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("forms.passwordPlaceholder") || "Password"} autoComplete="new-password" onBlur={() => onBlur('password')} ref={passwordRef} aria-invalid={(touched.password || attemptedSubmit) && (!password || password.length < 6)} />
            {(touched.password || attemptedSubmit) && (!password || password.length < 6) && (
                <div className="form-error">{!password ? (t("forms.required") || 'This field is required') : (t("forms.passwordTooShort") || 'Password must be at least 6 characters')}</div>
            )}

            <label htmlFor="register_business">{t("forms.businessLabel")}</label>
            <input id="register_business" name="business" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder={t("forms.businessPlaceholder") || "Business / Restaurant name"} autoComplete="organization" onBlur={() => onBlur('business')} ref={businessRef} aria-invalid={(touched.business || attemptedSubmit) && !business} />
            {(touched.business || attemptedSubmit) && !business && (
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
