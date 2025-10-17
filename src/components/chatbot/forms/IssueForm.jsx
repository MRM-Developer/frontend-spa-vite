import { useState, useRef, useEffect } from "react";
import { isEmailValid } from './validate';
import { useTranslation } from "react-i18next";

export default function IssueForm({ onSubmit, onCancel, prefill = {}, autoFocus = true }) {
    const { t } = useTranslation();

    const [email, setEmail] = useState(prefill.email || "");
    const [summary, setSummary] = useState(prefill.summary || "");
    const [details, setDetails] = useState(prefill.details || "");
    const [severity, setSeverity] = useState(prefill.severity || "minor");

    const firstFieldRef = useRef(null);
    const [touched, setTouched] = useState({ email: false, summary: false, details: false });
    const emailRef = useRef(null);
    const summaryRef = useRef(null);
    const detailsRef = useRef(null);
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
        const emailValid = email && isEmailValid(email);
        const summaryValid = summary && summary.trim().length > 0;
        const detailsValid = details && details.trim().length > 0;
        if (!emailValid || !summaryValid || !detailsValid) {
            setTouched({ email: true, summary: true, details: true });
            setFormError('Please fix the highlighted fields before sending');
            if (!emailValid && emailRef.current) emailRef.current.focus();
            else if (!summaryValid && summaryRef.current) summaryRef.current.focus();
            else if (!detailsValid && detailsRef.current) detailsRef.current.focus();
            return;
        }
        setFormError('');
        onSubmit({ email, summary, details, severity });
    }

    function onBlur(field) {
        setTouched(prev => ({ ...prev, [field]: true }));
    }

    const [formError, setFormError] = useState('');

    return (
        <form className="form-container message" onSubmit={handleSubmit}>
            <label htmlFor="issue_email">{t("forms.emailLabel")}</label>
            <input id="issue_email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("forms.emailPlaceholder")} ref={(el) => { emailRef.current = el; firstFieldRef.current = el; }} autoComplete="email" onBlur={() => onBlur('email')} aria-invalid={(touched.email || attemptedSubmit) && (!email || !isEmailValid(email))} />
            {(touched.email || attemptedSubmit) && (!email || !isEmailValid(email)) && (
                <div className="form-error">{!email ? (t("forms.required") || 'This field is required') : (t("forms.invalidEmail") || 'Please enter a valid email')}</div>
            )}

            <label htmlFor="issue_summary">{t("forms.issueSummaryLabel") || "Summary"}</label>
            <input id="issue_summary" name="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder={t("forms.issueSummaryPlaceholder") || "Short summary"} onBlur={() => onBlur('summary')} ref={summaryRef} aria-invalid={(touched.summary || attemptedSubmit) && !summary} />
            {(touched.summary || attemptedSubmit) && !summary && (
                <div className="form-error">{t("forms.requireIssueSummary") || 'Please provide a short summary'}</div>
            )}

            <label htmlFor="issue_details">{t("forms.issueDetailsLabel") || "Details"}</label>
            <textarea id="issue_details" name="details" className="issue-details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder={t("forms.issueDetailsPlaceholder") || "Describe the issue in detail"} onBlur={() => onBlur('details')} ref={detailsRef} aria-invalid={(touched.details || attemptedSubmit) && !details} />
            {(touched.details || attemptedSubmit) && !details && (
                <div className="form-error">{t("forms.requireIssueDetails") || 'Please provide details about the issue'}</div>
            )}

            <label>{t("forms.severityLabel") || "Severity"}</label>
            <div className="buttons-container">
                <button type="button" className={`${severity === 'minor' ? 'btn-solid-dark' : 'btn-solid-light btn-inner-shadow'} severity-button`} onClick={() => setSeverity('minor')} aria-pressed={severity === 'minor'}>Minor</button>
                <button type="button" className={`${severity === 'major' ? 'btn-solid-dark' : 'btn-solid-light btn-inner-shadow'} severity-button`} onClick={() => setSeverity('major')} aria-pressed={severity === 'major'}>Major</button>
                <button type="button" className={`${severity === 'critical' ? 'btn-solid-dark' : 'btn-solid-light btn-inner-shadow'} severity-button`} onClick={() => setSeverity('critical')} aria-pressed={severity === 'critical'}>Critical</button>
            </div>

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
