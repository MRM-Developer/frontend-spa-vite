//Import styles and libraries
import '../../App.scss';


const LegalNotice = () => {
    return (
        <div className='page page-impressum'>
            <div className='section section-text-block'>
                <h1>Impressum</h1>
                <p className='font-smaller'>Angaben gemäß § 5 DDG</p>
                <hr/>
                <h5>Name: </h5>
                <p>Diego Pérez Rodríguez <span className='font-small'>(Geschäftsbezeichnung: MyRestaurantMenu)</span></p>
                <h5>Addresse: </h5>
                <p>Heinz-Kühn-Str. 43</p>
                <p>51067 Köln</p>
                <p>Deutschland</p>
                <p>(Postanschrift, keine Besucheradresse)</p>
                <h5>E-Mail: </h5>
                <p>contact@myrestaurantmenu.com</p>
                <h5>Steuernummer: </h5>
                <p>214/5165/7342</p>
                <h5>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: </h5>
                <p>Diego Pérez Rodríguez, gleiche Anschrift wie oben.</p>
                <h5>Hosting und technische Infrastruktur: </h5>
                <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
                <h5>Datenbank: </h5>
                <p>MongoDB Atlas, MongoDB Inc., 1633 Broadway, 38th Floor, New York, NY 10019, USA</p>
                <h5>Haftungsausschluss:</h5>
                <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Alle Angaben auf dieser Website erfolgen ohne Gewähr auf Vollständigkeit, Richtigkeit und Aktualität.</p>
            </div>
        </div>
    )
}

export default LegalNotice