import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function HomeBanner(props) {
    const { currencyRate, currencySymbol } = props;
    const [coins, setCoins] = useState([]);
    const [exchanges, setExchanges] = useState([]);
    const [bitcoin, setBitcoin] = useState([]);
    const [limit, setLimit] = useState(2000);
    const [loading, setLoading] = useState(false);
    const allMarketCaps = marketCapCollector(coins);
    const allExchangeVols = exchangeVolCollector(coins);
    var NumAbbr = require('number-abbreviate');
    var numAbbr = new NumAbbr(['K', 'M', 'B', 'T']);
    function decimal(x) {
        return parseFloat(x).toFixed(1);
    };
    async function getApiAssets() {
        try {
            setLoading(true);
            const response = await axios.get("https://api.coincap.io/v2/assets", { params: { limit } });
            setCoins(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    async function getApiExchanges() {
        try {
            setLoading(true);
            const response = await axios.get("https://api.coincap.io/v2/exchanges", { params: { limit } });
            setExchanges(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    async function getApiBitcoin() {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/assets/bitcoin`);
            setBitcoin(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function marketCapCollector(e) {
        return (e?.map(function(o) { return o.marketCapUsd/currencyRate; })).map(Number);
    };
    function exchangeVolCollector(e) {
        return (e?.map(function(o) { return o.volumeUsd24Hr/currencyRate; })).map(Number);
    };
    function sum(e) {
        let sum = 0;
        for (let i = 0; i < e.length; i++) {
          sum += e[i];
        }
        return sum
    };
	function numberFormat(x) {
		return Intl.NumberFormat().format(x);
	};
    function domIndex(e) {
        return ((e?.marketCapUsd/currencyRate)/(sum(allMarketCaps)))*100
    }
    useEffect(() => {
        getApiAssets();
    }, []);
    useEffect(() => {
        getApiExchanges();
    }, []);
    useEffect(() => {
        getApiBitcoin();
    }, []);

    return (
        <div className="home-banner">
            <div className="container">
                <div className="home-banner-wrapper">
                    <div className="market-cap">
                        <h4>MARKET CAP</h4>
                        <h2>{currencySymbol + numAbbr.abbreviate(sum(allMarketCaps), 2)}</h2>
                    </div>
                    <div className="exchange-vol">
                        <h4>EXCHANGE VOL</h4>
                        <h2>{currencySymbol + numAbbr.abbreviate(sum(allExchangeVols), 2)}</h2>
                    </div>
                    <div className="assets">
                        <h4>ASSETS</h4>
                        <h2>{numberFormat(coins.length + 296)}</h2>
                    </div>
                    <div className="exchange">
                        <h4>EXCHANGES</h4>
                        <h2>{exchanges.length}</h2>
                    </div>
                    <div className="markets">
                        <h4>MARKETS</h4>
                        <h2>{numberFormat(11370)}</h2>
                    </div>
                    <div className="btc-dom-index">
                        <h4>BTC DOM INDEX</h4>
                        <h2>{decimal(domIndex(bitcoin)) + "%"}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}