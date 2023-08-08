import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import SwapPopup from "../swapPopup";
import "./style.css";

export default function Swap() {
    const gear = <FontAwesomeIcon icon={faGear} />
    const angleDown = <FontAwesomeIcon icon={faAngleDown} />
    const xMark = <FontAwesomeIcon icon={faXmark} />
    const [sellTokens, setSellTokens] = useState([]);
    const [getTokens, setGetTokens] = useState([]);
    const [limit, setLimit] = useState(2000)
    const [loading, setLoading] = useState(false);
    const [selectedSellTokenSymbol, setSelectedSellTokenSymbol] = useState("ETH");
    const [selectedGetTokenSymbol, setSelectedGetTokenSymbol] = useState("Select a token");
    const [sellTokensList, setSellTokensList] = useState(false);
    const [getTokensList, setGetTokensList] = useState(false);
    const [popup, setPopup] = useState(false)
    async function getApi() {
        try {
            setLoading(true);
            const response = await axios.get("https://api.coincap.io/v2/assets", { params: { limit } });
            setSellTokens(response.data.data);
            setGetTokens(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function onSearch(e) {
        const value = e.target.value;
            axios.get("https://api.coincap.io/v2/assets", { params: { search: value } }).then(function(response) {
                setSellTokens(response.data.data);
                setGetTokens(response.data.data);
                // console.log(response.data.data);
            })
    };
    function timeLoopSellTokens() {
        return sellTokens.map(function(token) {
            const {id, symbol} = token;
            return (
                <li key={id} onClick={() => {setSelectedSellTokenSymbol(symbol); setSellTokensList(false)}} >
                    <img className="logo" src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`} />
                    <div className="symbol-name-ERC">
                        <div className="symbol-name-wrapper">
                            <h4>{symbol}</h4>
                            <h5>ERC-20</h5>
                        </div>
                        <h4 className="light">token name</h4>
                    </div>
                    <Link>
                        <img className="explore" src="https://coincap.io/static/icons/etherscan-light.svg" />
                    </Link>
                </li>
            )
        })
    };
    function timeLoopGetTokens() {
        return getTokens.map(function(token) {
            const {id, symbol} = token;
            return (
                <li key={id} onClick={() => {setSelectedGetTokenSymbol(symbol); setGetTokensList(false)}} >
                    <img className="logo" src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`} />
                    <div className="symbol-name-ERC">
                        <div className="symbol-name-wrapper">
                            <h4>{symbol}</h4>
                            <h5>ERC-20</h5>
                        </div>
                        <h4 className="light">token name</h4>
                    </div>
                    <Link>
                        <img className="explore" src="https://coincap.io/static/icons/etherscan-light.svg" />
                    </Link>
                </li>
            )
        })
    };
    function showSellTokens() {
        setSellTokensList(!sellTokensList);
    };
    function showGetTokens() {
        setGetTokensList(!getTokensList);
    };
    function shuffle() {
        var token = document.getElementById("sell-input-token-wrapper")
        var selectHidden = document.getElementById("sell-input-select-wrapper-hidden")
        var select = document.getElementById("get-input-select-wrapper")
        var tokenHidden = document.getElementById("get-input-token-wrapper-hidden")

        if (selectHidden.style.display == "none" || tokenHidden.style.display == "none") {
            token.style.display = "none";
            selectHidden.style.display = "flex";
            select.style.display = "none";
            tokenHidden.style.display = "flex";
        } else {
            token.style.display = "flex";
            selectHidden.style.display = "none";
            select.style.display = "flex";
            tokenHidden.style.display = "none";
        }
    };
    function openPopup() {
        setPopup(true);
    };
    useEffect(() => {
        getApi();
    }, []);
    
    return (
        <div className="swap">
            <div className="swap-box">
                <div className="swap-setting-wrapper">
                    <h3>Swap</h3>
                    <i>{gear}</i>
                </div>
                <div className="sell-box">
                    <h4>You Sell</h4>
                    <div id="sell-input-token-wrapper">
                        <input placeholder="0" />
                        <div className="token-drop-down" onClick={showSellTokens}>
                            <img src={`https://assets.coincap.io/assets/icons/${selectedSellTokenSymbol.toLowerCase()}@2x.png`} />
                            <h3>{selectedSellTokenSymbol}</h3>
                            <i>{angleDown}</i>
                        </div>
                    </div>
                    <div id="sell-input-select-wrapper-hidden" style={{display: "none"}}>
                        <input placeholder="0" />
                        <div className={`select-drop-down ${selectedGetTokenSymbol === "Select a token" ? "width100" : ""}`} onClick={showGetTokens}>
                            {selectedGetTokenSymbol === "Select a token" ? "" : <img src={`https://assets.coincap.io/assets/icons/${selectedGetTokenSymbol.toLowerCase()}@2x.png`} />}
                            <h3>{selectedGetTokenSymbol}</h3>
                            <i>{angleDown}</i>
                        </div>
                    </div>
                </div>
                <div className="shuffle-icon" onClick={shuffle}>
                    <img src="https://coincap.io/static/icons/shuffle.svg" />
                </div>
                <div className="get-box">
                    <h4>You Get</h4>
                    <div id="get-input-select-wrapper">
                        <input placeholder="0" />
                        <div className={`select-drop-down ${selectedGetTokenSymbol === "Select a token" ? "width100" : ""}`} onClick={showGetTokens}>
                            {selectedGetTokenSymbol === "Select a token" ? "" : <img src={`https://assets.coincap.io/assets/icons/${selectedGetTokenSymbol.toLowerCase()}@2x.png`} />}
                            <h3>{selectedGetTokenSymbol}</h3>
                            <i>{angleDown}</i>
                        </div>
                    </div>
                    <div id="get-input-token-wrapper-hidden" style={{display: "none"}}>
                        <input placeholder="0" />
                        <div className="token-drop-down" onClick={showSellTokens}>
                            <img src={`https://assets.coincap.io/assets/icons/${selectedSellTokenSymbol.toLowerCase()}@2x.png`} />
                            <h3>{selectedSellTokenSymbol}</h3>
                            <i>{angleDown}</i>
                        </div>
                    </div>
                </div>
                <button className="green-wallet" onClick={openPopup}>Connect Wallet</button>
            </div>
            <div className={`swap-sell-tokens-list ${sellTokensList === true ? "active" : "inactive"}`}>
                <div className="title-close-wrapper">
                    <h3>Select a token</h3>
                    <i onClick={showSellTokens}>{xMark}</i>
                </div>
                <input
                    className="token-search-bar"
                    type="text"
                    placeholder="Search by symbol, name, or address..."
                    onChange={onSearch}
                />
                <ul>
                    {timeLoopSellTokens()}
                </ul>
            </div>
            <div className={`swap-get-tokens-list ${getTokensList === true ? "active" : "inactive"}`}>
                <div className="title-close-wrapper">
                    <h3>Select a token</h3>
                    <i onClick={showGetTokens}>{xMark}</i>
                </div>
                <input
                    className="token-search-bar"
                    type="text"
                    placeholder="Search by symbol, name, or address..."
                    onChange={onSearch}
                />
                <ul>
                    {timeLoopGetTokens()}
                </ul>
            </div>
            <SwapPopup enabled={popup} setEnabled={setPopup} />
        </div>
    )
}