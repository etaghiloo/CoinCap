import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../black.svg";
import Rates from "../rates";
import LanguageSelector from "../languageSelector";
import Search from "../search";
import SettingsPopup from "../../components/settingsPopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

export default function Header(props) {
    const { secondRateTransfer, secondSymbolTransfer, themeTransfer } = props;
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [theme, setTheme] = useState();
    const gear = <FontAwesomeIcon icon={faGear} />
    function openPopup() {
        setSettingsPopup(true);
    };
    useEffect(() => {
        secondRateTransfer(currencyRate);
    }, [currencyRate]);
    useEffect(() => {
        secondSymbolTransfer(currencySymbol);
    }, [currencySymbol]);
    useEffect(() => {
        themeTransfer(theme);
    }, [theme]);
    
    return (
        <div className={`header ${theme}`}>
            <div className="container">
                <div className="header-wrapper">
                    <ul className="menu-left">
                        <li>
                            <Link to={`/`}>
                                <h4>Coins</h4>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/exchanges`}>
                                <h4>Exchanges</h4>
                            </Link>
                        </li>
                        <li>
                            <Link to={`https://app.shapeshift.com/?_ga=2.237482560.1738883697.1687789575-1967908668.1686495913#/trade`}>
                                <h4>Swap</h4>
                            </Link>
                        </li>
                    </ul>
                    <div className="logo">
                        <Link to={`/`}>
                            <img src={theme === "light" ? logo : "https://coincap.io/static/logos/white.svg"} />
                        </Link>
                    </div>
                    <ul className="menu-right">
                        <li>
                            <Rates firstRateTransfer={setCurrencyRate} firstSymbolTransfer={setCurrencySymbol} theme={theme} />
                        </li>
                        <li className="languages">
                            <LanguageSelector theme={theme} />
                        </li>
                        <li className="search">
                            <Search />
                        </li>
                        <li className="setting">
                            <i onClick={openPopup}>{gear}</i>
                        </li>
                    </ul>
                </div>
                <SettingsPopup
                    secondRateTransfer={setCurrencyRate} secondSymbolTransfer={setCurrencySymbol}
                    enabled={settingsPopup} setEnabled={setSettingsPopup}
                    themeTransfer={setTheme}
                />
            </div>
        </div>
    )
}