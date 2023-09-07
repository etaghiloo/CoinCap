import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ShapeShiftHeader from "../../components/shapeShiftHeader";
import Header from "../../components/header";
import CoinBanner from "../../components/coinBanner";
import CoinHistoryChart from "../../components/coinHistoryChart";
import Swap from "../../components/swap";
import CoinMarketsList from "../../components/coinMarketsList";
import Footer from "../../components/footer";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

export default function SingleCoin() {
    const { id } = useParams();
    const idnew = id.replace(/\s+/g, '-').toLowerCase();
    const [coin, setCoin] = useState({});
    const [markets, setMarkets] = useState([])
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    const [theme, setTheme] = useState();
    const navigate = useNavigate();
    async function getApi() {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/assets/${idnew}`);
            setCoin(response.data.data);
            setLoading(false);
        } catch (e) {
            navigate(`/notfound`);
            setLoading(false);
        }
    };
    async function getApiMarkets() {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/assets/${idnew}/markets`, { params: { limit }});
            setMarkets(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function loadMore() {
        setLoading(true)
        setTimeout(() => {
            setLimit(limit + 40);
        }, 1000)
    };
    function titleCase(str) {
        var splitStr = str.toLowerCase().split('-');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' '); 
    };
    useEffect(() => {
        document.title = `${titleCase(id)} | CoinCap.io`;
    }, []);
    useEffect(function() {
        getApi();
    }, [idnew]);
    useEffect(function() {
        getApiMarkets();
    }, [limit]);

    return (
        <div className={`coin-page ${theme}`}>
            <ShapeShiftHeader />
            <Header secondRateTransfer={setCurrencyRate} secondSymbolTransfer={setCurrencySymbol} themeTransfer={setTheme} />
            <CoinBanner data={coin} dataM={markets} currencyRate={currencyRate} currencySymbol={currencySymbol} theme={theme} />
            <div className="chart-swap">
                <div className="container-orig">
                    <div className="chart-swap-wrapper">
                        <CoinHistoryChart coinData={coin} currencyRate={currencyRate} currencySymbol={currencySymbol} theme={theme} />
                        <Swap theme={theme} />
                    </div>
                </div>
            </div>
            <div className="markets">
                <CoinMarketsList marketsData={markets} currencyRate={currencyRate} currencySymbol={currencySymbol} theme={theme} />
                <button className="green" onClick={loadMore} disabled={loading}>
                    {loading === true ?
                        <Spinner animation="border" variant="light" size="sm" role="status"></Spinner>
                        :
                        "View More"
                    }
                </button>
            </div>
            <Footer theme={theme} />
        </div>
    )
}