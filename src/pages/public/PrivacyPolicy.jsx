// Import styles and libraries
import '../../App.scss';


const PrivacyPolicy = () => {
    return (
        <div className="page page-privacy-policy">
            <div className="section section-text-block">
                <h1>Datenschutzerklärung</h1>
                <hr/>

                <h5>1. Verantwortlicher</h5>
                <p>Diego Pérez Rodríguez (Geschäftsbezeichnung: MyRestaurantMenu)</p>
                <p>Heinz-Kühn-Str. 43, 51067 Köln, Deutschland</p>
                <p>E-Mail: contact@myrestaurantmenu.com</p>

                <h5>2. Geltungsbereich & Domains</h5>
                <p>Diese Erklärung gilt für <strong>myrestaurantmenu.com</strong> (Landing Page), <strong> app.myrestaurantmenu.com</strong> (Web-App), <strong>app.api.myrestaurantmenu.com</strong> (API), sowie für kundenspezifische Subdomains wie <em>pizzapazzi.myrestaurantmenu.com</em> (Frontend) und <em>pizzapazzi.api.myrestaurantmenu.com</em> (Backend).</p>

                <h5>3. Rollen nach DSGVO</h5>
                <ul>
                    <li><strong>Verantwortlicher (Controller):</strong> für alle Daten auf Landing Page, App, Konten von Restaurantinhabern, Abrechnung/Abos, Kontaktformulare, sowie für den Chatbot auf der Landing Page.</li>
                    <li><strong>Auftragsverarbeiter (Processor):</strong> für Daten, die wir <em>im Auftrag</em> von Restaurants über deren Gäste verarbeiten (z.&nbsp;B. Stempel-/Treuesystem, Newsletter-Einwilligungen, Likes, Feedback/Kommentare). Dafür schließen wir mit jedem Restaurant einen <strong>Auftragsverarbeitungsvertrag (AVV/DPA)</strong>.</li>
                </ul>

                <h5>4. Verarbeitete Daten</h5>
                <ul>
                    <h6>4.1 Restaurantinhaber (Kunden)</h6>
                    <ul>
                        <li>Accountdaten: Name, E-Mail, Passwort (gehasht)</li>
                        <li>Vertrags-/Abo-/Zahlungsstatus (keine Zahlungsdaten bei uns gespeichert, nur Status/Metadaten)</li>
                        <li>Restaurantdaten: Menüeinträge (Name, Beschreibung, Allergene, Preis, Bild-IDs)</li>
                    </ul>
                </ul>
                <ul>
                    <h6>4.2 Restaurantgäste (Endnutzer, im Auftrag des Restaurants)</h6>
                    <ul>
                        <li>Accountdaten (falls angelegt): E-Mail/Benutzername, Passwort (gehasht)</li>
                        <li>Treue-/Stempelsystem, Newsletter-Einwilligung, Likes, Feedback/Kommentare</li>
                        <li><em>Keine</em> IP-Adressen oder Tracking durch Google Analytics im Menübereich. Es werden nur gerätebezogene UI-Signale lokal verarbeitet (z.&nbsp;B. Bildschirmgröße, Keyboard offen/zu) zur UX-Optimierung.</li>
                    </ul>
                </ul>

                <h5>5. Zwecke & Rechtsgrundlagen (Art. 6 DSGVO)</h5>
                <ul>
                    <li>Vertragserfüllung & Kundenverwaltung (Art. 6 Abs. 1 lit. b DSGVO): Konten von Restaurantinhabern, Bereitstellung der App, Abos, Support.</li>
                    <li>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO): Sicherheit, Missbrauchsvermeidung, Produktverbesserung (UI-Signale ohne Personenbezug).</li>
                    <li>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO): Cookies/GA4 auf Landing Page; optionaler KI-Chatbot auf Landing Page; Newsletter-Einwilligungen (Gäste).</li>
                    <li>Rechtspflicht (Art. 6 Abs. 1 lit. c DSGVO): steuerliche Aufbewahrungspflichten.</li>
                </ul>

                <h5>6. Cookies, Consent & Google Analytics 4</h5>
                <p>Auf der <strong>Landing Page</strong> verwenden wir Google Analytics 4 nur nach Ihrer Einwilligung über unser Cookie-Banner. Im Menübereich der Restaurants <strong>wird kein GA eingesetzt</strong>.</p>
                <ul>
                    <li>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
                    <li>Widerruf: jederzeit im Cookie-Banner/Cookie-Einstellungen möglich</li>
                    <li>Daten: u.&nbsp;a. Seitenaufrufe, Interaktionen, ggf. gekürzte IP; Speicherdauer gemäß GA4-Konfiguration</li>
                </ul>

                <h5>7. KI-Chatbot (Landing Page)</h5>
                <p>Der Chatbot auf <strong>myrestaurantmenu.com</strong> ist <strong>optional</strong> und nur nach <strong>Einwilligung</strong> nutzbar. Inhalte, die Sie in den Chat eingeben (z.&nbsp;B. Formularangaben), können zur Beantwortung über eine KI-API (derzeit Google Gemini; künftig ggf. OpenAI) verarbeitet werden. Für Nutzer, die dies nicht wünschen, steht ein separates Kontaktformular ohne KI-Verarbeitung zur Verfügung.</p>
                <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</p>

                <h5>8. Empfänger & Auftragsverarbeiter</h5>
                <ul>
                    <li><strong>Hosting/Edge/Serverless:</strong> Vercel Inc., USA (<em>Region noch zu bestätigen</em>). <br/>Daten können im Rahmen des Betriebs über Edge/PoPs geleitet werden. Es bestehen <strong>Standardvertragsklauseln (SCCs)</strong>. <em>TODO: Nach Bestätigung EU-Region entsprechend anpassen.</em></li>
                    <li><strong>Datenbank:</strong> MongoDB Atlas, Region Frankfurt (EU). Vertragliche AVV/SCCs vorhanden.</li>
                    <li><strong>E-Mail-Dienst</strong> (<em>wird ergänzt</em>): z.&nbsp;B. eigener SMTP-Provider. <em>TODO: Anbietername/Anschrift ergänzen, AVV/SCCs verlinken.</em></li>
                    <li><strong>Analytics:</strong> Google Ireland Ltd. (GA4); ggf. Übermittlungen an Google LLC (USA) mit SCCs.</li>
                    <li><strong>KI-API (optional):</strong> Google Gemini (und künftig ggf. OpenAI) – nur bei Nutzung des Chatbots.</li>
                </ul>

                <h5>9. Drittlandübermittlungen</h5>
                <p>Bei Einsatz von Vercel, GA4 und KI-APIs kann es zu Übermittlungen in Drittländer (insbesondere USA) kommen. Diese erfolgen auf Grundlage von <strong>SCCs</strong> und ergänzenden Maßnahmen. MongoDB Atlas ist in Frankfurt konfiguriert; gleichwohl können Supportzugriffe aus Drittländern auftreten (ebenfalls über SCCs).</p>

                <h5>10. Speicherdauer</h5>
                <ul>
                    <li>Kontodaten von Restaurantinhabern: für die Vertragslaufzeit; danach nach gesetzlichen Fristen (i.&nbsp;d.&nbsp;R. 6–10 Jahre) gelöscht/anonymisiert.</li>
                    <li>Daten der Restaurantgäste (im Auftrag): gemäß Weisung des Restaurants; Löschung nach Vertragsende bzw. auf Anforderung des Restaurants.</li>
                    <li>Protokoll-/Sicherheitsdaten: nur so lange wie erforderlich, dann Löschung/Anonymisierung.</li>
                </ul>

                <h5>11. Erforderlichkeit der Bereitstellung</h5>
                <p>Die Bereitstellung von Grunddaten (Account, E-Mail, Passwort) ist für die Nutzung der App erforderlich. Ohne diese Daten ist eine Kontenerstellung nicht möglich.</p>

                <h5>12. Rechte der betroffenen Personen</h5>
                <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit sowie Widerspruch (Art. 15–21 DSGVO). Einwilligungen können jederzeit mit Wirkung für die Zukunft widerrufen werden.</p>
                <p>Für Daten, die wir <em>im Auftrag</em> eines Restaurants verarbeiten, richten Sie bitte Ihre Anfragen bevorzugt an das jeweilige Restaurant; wir unterstützen dieses bei der Bearbeitung.</p>

                <h5>13. Beschwerderecht</h5>
                <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig für uns ist: <br/><strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</strong>.</p>

                <h5>14. Kontakt</h5>
                <p>Für Datenschutzanfragen: <a href="mailto:contact@myrestaurantmenu.com">contact@myrestaurantmenu.com</a></p>

                <h5>15. Änderungen</h5>
                <p>Wir aktualisieren diese Datenschutzerklärung bei Änderungen an Diensten, Rechtslage oder technischen Verfahren. Die jeweils aktuelle Version wird hier veröffentlicht.</p>
            </div>
        </div>
    )
}

export default PrivacyPolicy