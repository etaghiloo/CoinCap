import { useState, useEffect } from "react";
import portis from "../../portis.svg";
import metamask from "../../metamask.png";
import walletConnect from "../../walletConnect.svg";
import torus from "../../torusWallet.svg";
import coinbaseWallet from "../../coinbaseWallet.svg";
import binanceChainWallet from "../../bscWallet.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

export default function SwapPopup(props) {
    const { enabled, setEnabled, theme } = props;
    const xMark = <FontAwesomeIcon icon={faXmark} />
    const [hideWallets, setHideWallets] = useState(false);
    function close() {
        setEnabled(false);
    };
    function hideSomeWallets() {
        setHideWallets(true);
    };
    function showSomeWallets() {
        setHideWallets(false);
    };
    useEffect(() => {
        document.getElementById("ethereum").click();
    }, []);

    return (
        <div className={`swap-popup ${theme} ${enabled == true ? "active" : "inactive"}`}>
            <div className="background"></div>
            <div className="popup-box">
                <div className="close">
                    <i onClick={close}>{xMark}</i>
                </div>
                <div className="networks">
                    <h3 className="title">Select a network</h3>
                    <div className="networks-wrapper">
                        <button className={`network ethereum ${hideWallets == false ? "clicked" : ""}`} id="ethereum" onClick={showSomeWallets}>
                            <img src="https://assets.coincap.io/assets/icons/eth@2x.png" />
                            <h3>Ethereum</h3>
                        </button>
                        <button className={`network binance ${hideWallets == true ? "clicked" : ""}`} id="binance" onClick={hideSomeWallets}>
                            <img src="https://assets.coincap.io/assets/icons/bnb@2x.png" />
                            <h3>Binance</h3>
                        </button>
                    </div>
                </div>
                <div className="connect">
                    <h3 className="title">Connect a wallet</h3>
                    <button className={`connect shape-shift ${hideWallets == true ? "hidden" : ""}`}>
                        <h3>Portis By ShapeShift</h3>
                        <img src={portis} />
                    </button>
                    <button className="connect metamask">
                        <h3>Install Metamask</h3>
                        <img src={metamask} />
                    </button>
                    <button className="connect wallet-connect">
                        <h3>WalletConnect</h3>
                        <img src={walletConnect} />
                    </button>
                    <button className="connect torus">
                        <h3>Torus</h3>
                        <img src={torus} />
                    </button>
                    <button className={`connect coinbase-wallet ${hideWallets == true ? "hidden" : ""}`}>
                        <h3>Coinbase Wallet</h3>
                        <img src={coinbaseWallet} />
                    </button>
                    <button className="connect binance-chain-wallet">
                        <h3>Binance Chain Wallet</h3>
                        <img src={binanceChainWallet} />
                    </button>
                </div>
            </div>
        </div>
    )
}