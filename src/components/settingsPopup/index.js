import { useState, useEffect } from "react";
import settingsGears from "../../settings-gears.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import LanguageSelector from "../languageSelector";
import Rates from "../rates";
import "./style.css";

export default function SettingsPopup(props) {
    const { secondRateTransfer, secondSymbolTransfer, enabled, setEnabled } = props;
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    const [darkTheme, setDarkTheme] = useState(false);
    const [flash, setFlash] = useState(false);
    const xMark = <FontAwesomeIcon icon={faXmark} />
    const check = <FontAwesomeIcon icon={faCheck} />
    function close() {
        setEnabled(false);
    };
    function darkThemeClick() {
        setDarkTheme(!darkTheme);
    };
    function flashClick() {
        setFlash(!flash);
    };
    useEffect(() => {
        secondRateTransfer(currencyRate);
    }, [currencyRate]);
    useEffect(() => {
        secondSymbolTransfer(currencySymbol);
    }, [currencySymbol]);

    return (
        <div className={`settings-popup ${enabled === true ? "active" : "inactive"}`}>
            <div className="background"></div>
            <div className="settings-box">
                <div className="settings-header">
                    <div className="left">
                        <img src={settingsGears} />
                        <h3>Settings</h3>
                    </div>
                    <div className="right">
                        <i onClick={close}>{xMark}</i>
                    </div>
                </div>
                <div className="settings-list">
                    <div className="theme">
                        <h4>Dark Theme</h4>
                        <span onClick={darkThemeClick}></span>
                        <i onClick={darkThemeClick} className={`${darkTheme === true ? "active" : "inactive" }`}>{check}</i>
                    </div>
                    <div className="flash">
                        <h4>Flash Price Indicators</h4>
                        <span onClick={flashClick}></span>
                        <i onClick={flashClick} className={`${flash === true ? "active" : "inactive" }`}>{check}</i>
                    </div>
                    <div className="settings-rates">
                        <Rates firstRateTransfer={setCurrencyRate} firstSymbolTransfer={setCurrencySymbol} />
                    </div>
                    <div className="settings-language">
                        <LanguageSelector />
                    </div>
                </div>
            </div>
        </div>
    )
}