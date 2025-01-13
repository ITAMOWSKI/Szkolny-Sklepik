// components/layout/Footer.js
import {Component} from "react";

class Footer extends Component {
    render() {
        return (
            <footer className="footer bg-body-tertiary">
                <div className="container">
                    <p className="text-muted">
                        © {new Date().getFullYear()} Szkolny Sklepik. Wszystkie prawa zastrzeżone. Mateusz Szelec 4AP
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;