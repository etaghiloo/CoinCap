import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import "./style.css";

export default function Footer(props) {
    const { theme } = props;
    const twitter = <FontAwesomeIcon icon={faTwitter} />
    const facebook = <FontAwesomeIcon icon={faSquareFacebook} />
    
    return (
        <div className={`footer ${theme}`}>
            <div className="container">
                <div className="footer-wrapper">
                    <div className="column one">
                        <h4>COINCAP.IO</h4>
                        <ul>
                            <li>
                                <h4 className="light">
                                    <Link>Methodology</Link>
                                </h4>
                            </li>
                            <li>
                                <h4 className="light">
                                    <Link>Support</Link>
                                </h4>
                            </li>
                            <li>
                                <h4 className="light">
                                    <Link>Our API</Link>
                                </h4>
                            </li>
                            <li>
                                <h4 className="light">
                                    <Link>Rate Comparison</Link>
                                </h4>
                            </li>
                            <li>
                                <h4 className="light">
                                    <Link>Careers</Link>
                                </h4>
                            </li>
                        </ul>
                    </div>
                    <div className="column two">
                        <div className="legals">
                            <h4>LEGALS</h4>
                            <ul>
                                <li>
                                    <h4 className="light">
                                        <Link>Terms of Service</Link>
                                    </h4>
                                </li>
                                <li>
                                    <h4 className="light">
                                        <Link>Privacy Policy</Link>
                                    </h4>
                                </li>
                            </ul>
                        </div>
                        <div className="disclaimer">
                            <h4>DISCLAIMER</h4>
                            <h4 className="light">Neither ShapeShift AG nor CoinCap are in any way associated with CoinMarketCap, LLC or any of its goods and services.</h4>
                        </div>
                    </div>
                    <div className="column three">
                        <h4>FOLLOW US</h4>
                        <ul className="platforms">
                            <li>
                                <Link>
                                    <i>{twitter}</i>
                                </Link>
                            </li>
                            <li>
                                <Link>
                                    <i>{facebook}</i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="column four">
                        <h4>COINCAP APP AVAILABLE ON</h4>
                        <ul>
                            <li>
                                <Link to="https://play.google.com/store/apps/details?id=io.coinCap.coinCap">
                                    <img src="https://coincap.io/static/images/stores/google_play.svg" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://apps.apple.com/us/app/coincap/id1074052280?ign-mpt=uo%3D4">
                                <img src="https://coincap.io/static/images/stores/apple_store.svg" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}