// Import styles and libraries
import '../../App.scss';


const Status = () => {
    return (
        <div className='page page-terms-service'>
            <div className='section section-status'>
                <header>
                    <h1>myRESTAURANTmenu<span>STATUS</span></h1>
                </header>
                <div class="status-banner">
                    <strong>All systems stable</strong>
                    <span>Last checked on September 27, 2025 at 4:00PM</span>
                </div>
                <div class="status-legend">
                    <h2>Current Status</h2>
                    <div class="legend">
                        <span><span class="dot green"></span>Normal</span>
                        <span><span class="dot blue"></span>Info</span>
                        <span><span class="dot yellow"></span>Partial Outage</span>
                        <span><span class="dot red"></span>Outage</span>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic Services</td>
                            <td><span class="dot green"></span></td>
                        </tr>
                        <tr>
                            <td>Design Editor</td>
                            <td><span class="dot green"></span></td>
                        </tr>
                        <tr>
                            <td>Link Pages</td>
                            <td><span class="dot green"></span></td>
                        </tr>
                        <tr>
                            <td>Online Menus</td>
                            <td><span class="dot green"></span></td>
                        </tr>
                        <tr>
                            <td>QR Codes</td>
                            <td><span class="dot green"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Status