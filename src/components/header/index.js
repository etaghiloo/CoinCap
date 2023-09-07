import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../black.svg";
import Rates from "../rates";
import LanguageSelector from "../languageSelector";
import Search from "../search";
import SettingsPopup from "../../components/settingsPopup";
import SwapPopup from "../swapPopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBars, faXmark, faArrowRightArrowLeft, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import useWindowSize from "../../customHooks/useWindowSize";
import "./style.css";

export default function Header(props) {
    const { secondRateTransfer, secondSymbolTransfer, themeTransfer } = props;
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    const [settingsPopup, setSettingsPopup] = useState(false);
    const [connectPopup, setConnectPopup] = useState(false);
    const [theme, setTheme] = useState();
    const windowWidth = useWindowSize();
    const [sideMenu, setSideMenu] = useState(false);
    const gear = <FontAwesomeIcon icon={faGear} />
    const barMenu = <FontAwesomeIcon icon={faBars} />
    const xMark = <FontAwesomeIcon icon={faXmark} />
    const bitcoin = <FontAwesomeIcon icon={faBitcoin} />
    const exchange = <FontAwesomeIcon icon={faArrowRightArrowLeft} />
    const swap = <FontAwesomeIcon icon={faShuffle} />
    const api = <FontAwesomeIcon icon={faNewspaper} />
    const sideMenuRef = useRef(null);
    function openPopup() {
        setSettingsPopup(true);
    };
    function openConnectPopup() {
        setConnectPopup(true);
    };
    function openSideMenu() {
        setSideMenu(true);
    };
    function closeSideMenu() {
        setSideMenu(false);
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
    useEffect(() => {
        let handler = (e) => {
            if (!sideMenuRef.current.contains(e.target)) {
                setSideMenu(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    return (
        <div className={`header ${theme} ${windowWidth <= 950 ? "mobile-view" : ""}`}>
            <div className="container-orig">
                <div className="header-wrapper">
                    <div className={`bar-menu ${windowWidth <= 950 ? "active" : ""}`}>
                        <i className={`bars ${sideMenu === false ? "active" : ""}`} onClick={openSideMenu}>
                            {barMenu}
                        </i>
                        <i className={`close ${sideMenu === true ? "active" : ""}`} onClick={closeSideMenu}>
                            {xMark}
                        </i>
                    </div>
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
            <ul className={`side-menu ${theme} ${sideMenu === true ? "active" : ""}`} ref={sideMenuRef}>
                <li>
                    <Link to={`/`}>
                        <i>{bitcoin}</i>
                        <h3>Coins</h3>
                    </Link>
                </li>
                <li>
                    <Link to={`/exchanges`}>
                        <i>{exchange}</i>
                        <h3>Exchanges</h3>
                    </Link>
                </li>
                <li>
                    <Link to={`https://app.shapeshift.com/?_ga=2.237482560.1738883697.1687789575-1967908668.1686495913#/trade`}>
                        <i>{swap}</i>
                        <h3>Swap</h3>
                    </Link>
                </li>
                <li>
                    <Link to="https://docs.coincap.io/">
                        <i>{api}</i>
                        <h3>API</h3>
                    </Link>
                </li>
                <li className="setting" onClick={openPopup}>
                    <i>{gear}</i>
                    <h3>Settings</h3>
                </li>
                <li>
                    <button className="green-wallet" onClick={openConnectPopup}>Connect Wallet</button>
                </li>
                <hr></hr>
                <li>
                    <Rates firstRateTransfer={setCurrencyRate} firstSymbolTransfer={setCurrencySymbol} theme={theme} />
                </li>
                <li className="languages">
                    <LanguageSelector theme={theme} />
                </li>
            </ul>
            <SwapPopup enabled={connectPopup} setEnabled={setConnectPopup} theme={theme} />
        </div>
    )
}