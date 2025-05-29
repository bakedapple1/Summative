import "./Footer.css";

function Footer() {

    return (
        <>
            <hr className="footer-divider" />
            <div className="footer">
                <div className="footer-links">
                    <a className="footer-link" id="github" href="https://github.com/bakedapple1/Assignment-5" target="_blank">GitHub</a>
                    <a className="footer-link" id="license"
                        href="https://preview.redd.it/what-are-some-funny-license-plates-youve-seen-in-ottawa-v0-w3pu1v029tub1.jpg?width=640&crop=smart&auto=webp&s=2fa076cb07306240e492631ca6178d3e9bcce591"
                        target="_blank">Licence Agreement</a>
                    <a className="footer-link" id="privacy" href="https://youtu.be/dQw4w9WgXcQ" target="_blank">Privacy Policy</a>
                </div>

                <div className="footer-text">
                    <p id="credit">Web Design: Daniel C</p>
                    <p id="copyright">© BingBerry 2025</p>
                </div>
            </div>
        </>
    );
}

export default Footer;