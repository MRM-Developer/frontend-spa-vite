// Import styles and libraries
import '../../App.scss';

const TermsOfService = () => {
    return (
        <div className='page page-terms-service'>
            <div className='section section-text-block'>
                <h1>Terms of Service</h1>
                <p className='font-smaller'>Last updated: October 2025</p>
                <hr/>
                <p>These Terms of Service ("Terms") govern your access to and use of the platform <strong>MyRestaurantMenu</strong> operated by Diego Pérez Rodríguez, Heinz-Kühn-Str. 43, 51067 Köln, Germany ("MyRestaurantMenu", "we", "us" or "our").</p>

                <p>By using or registering for any of our Services, you agree to be bound by these Terms. Please read them carefully before creating an account. If you do not agree, you must not use the Services.</p>

                <h5>1. Description of the Service</h5>
                <p>MyRestaurantMenu provides an online software platform that allows restaurants to create, manage and publish digital menus, loyalty programs, and related marketing features. End-users (restaurant guests) may interact with these restaurants through likes, comments, stamp/fidelity programs and other voluntary features.</p>

                <h5>2. Scope of Application</h5>
                <p>These Terms apply to all users of our platform, including restaurant-owner accounts ("Customers") and end-users ("Guests"). Business relationships with Customers are governed by these Terms and, where applicable, mandatory consumer protection law for Guests.</p>

                <h5>3. Account Registration</h5>
                <ul>
                    <li>To use the Service, you must create an account with accurate and complete information. Restaurant accounts require a valid email address and password.</li>
                    <li>You are responsible for maintaining the confidentiality of your credentials and for all activities occurring under your account.</li>
                    <li>You must be at least 18 years old to register a restaurant account.</li>
                </ul>

                <h5>4. Free Trial and Subscriptions</h5>
                <p>We may offer a free trial period that grants limited access to the Service. No payment method is required during this trial. After the trial ends, continued use requires a paid subscription according to the plan selected.</p>
                <p>Subscriptions are billed in euros (€) and may be paid via Stripe or bank transfer. Payment terms, features, and prices are displayed on the current pricing page of our website. Subscription fees are due in advance and are non-refundable once the billing period has started.</p>
                <p>Subscriptions automatically renew for the same period unless cancelled before the next billing cycle. You can cancel any time through your account settings or by contacting us at{' '} <a href='mailto:contact@myrestaurantmenu.com'> contact@myrestaurantmenu.com </a>.</p>

                <h5>5. User Content and Data</h5>
                <p>Restaurants can upload menu items, images, texts, prices, and other materials ("User Content"). Guests may create accounts and submit limited interaction data (likes, loyalty points, feedback).</p>
                <ul>
                    <li>You retain ownership of your User Content. You grant us anon-exclusive, worldwide, royalty-free licence to host, display, and process such content only to provide and improve the Service.</li>
                    <li>You must ensure that your content and activity on the platform do not infringe any third-party rights or violate applicable law.</li>
                    <li>We may remove or disable content that breaches these Terms or legalrequirements.</li>
                </ul>

                <h5>6. Acceptable Use</h5>
                <p>You agree not to misuse the Service. In particular, you must not:</p>
                <ul>
                    <li>Upload or share unlawful, offensive, or defamatory content, or content that infringes intellectual property rights.</li>
                    <li>Attempt to access systems without authorisation, introduce malware, or interfere with the operation or security of the Service.</li>
                    <li>Use the Service for spamming, scraping, or commercial exploitation outside the intended purpose.</li>
                </ul>

                <h5>7. Payments and Taxes</h5>
                <p>All prices are shown net of applicable taxes. German VAT (Umsatzsteuer) will be added where required by law. Customers outside Germany may be responsible for VAT according to EU rules. We issue digital invoices for every payment.</p>

                <h5>8. Termination</h5>
                <p>You may terminate your account at any time by written notice or via the account dashboard. Upon termination or non-payment, access to your menus, QR codes and loyalty programs will be deactivated. Data may be deleted after a reasonable retention period according to our Privacy Policy.</p>

                <h5>9. Intellectual Property</h5>
                <p>The platform, design, and all MyRestaurantMenu materials remain our intellectual property. You receive a limited, non-transferable licence to use the Service during your active subscription. Reverse engineering, copying, or reselling the software is prohibited.</p>

                <h5>10. Limitation of Liability</h5>
                <p>We provide the Service with reasonable care and skill but cannot guarantee uninterrupted availability. To the extent permitted by law, we are not liable for indirect or consequential damages, loss of profit, or data loss. Our total liability shall not exceed the amount you paid for the Service during the last three months preceding the event causing the claim.</p>

                <h5>11. Data Protection</h5>
                <p>Personal data is processed in accordance with our{' '} <a href='/privacy-policy'>Privacy Policy</a>. When we process guest data on behalf of restaurants, we act as a data processor under the applicable Data Processing Agreement (Auftragsverarbeitungsvertrag).</p>

                <h5>12. Communication</h5>
                <p>By creating an account, you agree that we may send you transactional emails and messages necessary for operating the Service. You can unsubscribe from marketing messages at any time.</p>

                <h5>13. Modifications</h5>
                <p>We may update these Terms to reflect changes in functionality, legal requirements, or business operations. The current version will always be available on our website. Significant changes will be announced in advance. Continued use after updates constitutes acceptance of the new Terms.</p>

                <h5>14. Applicable Law and Dispute Resolution</h5>
                <p>These Terms are governed by the laws applicable at the operator’s place of establishment (Germany), excluding conflict-of-law rules. Nothing in these Terms limits mandatory consumer protection rights in the user’s country of residence.</p>

                <h5>15. Contact</h5>
                <p>For any questions regarding these Terms or the Service, please contact us at:{' '} <a href='mailto:contact@myrestaurantmenu.com'> contact@myrestaurantmenu.com</a></p>
            </div>
        </div>
    );
};

export default TermsOfService;
