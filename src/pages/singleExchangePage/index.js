import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShapeShiftHeader from "../../components/shapeShiftHeader";
import Header from "../../components/header";
import ExchangeBanner from "../../components/exchangeBanner";
import ExchangeMarketList from "../../components/exchangeMarketList";
import Footer from "../../components/footer";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

export default function SingleExchange() {
    const {id} = useParams();
    const idnew = id.replace(/\s+/g, '-').toLowerCase();
    const exchangeId = idnew;
    const [exchange, setExchange] = useState({});
    const [exchangeMarket, setExchangeMarket] = useState([]);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    const navigate = useNavigate();
    async function getApiExchange() {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/exchanges/${idnew}`);
            setExchange(response.data.data);
            setLoading(false);
        } catch (e) {
            navigate(`/notfound`);
            setLoading(false);
        }
    };
    async function getApiExchangeMarket() {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/markets`, { params: {exchangeId, limit} });
            setExchangeMarket(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function loadMore() {
        setLoading(true)
        setTimeout(function() {
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
        document.title = `${titleCase(id)} Exchange and Trade Data | CoinCap.io`;
    }, []);
    useEffect(function() {
        getApiExchange();
    }, [idnew]);
    useEffect(function() {
        getApiExchangeMarket();
    }, [limit]);
    return (
        <div className="exchange-page">
            <ShapeShiftHeader />
            <Header secondRateTransfer={setCurrencyRate} secondSymbolTransfer={setCurrencySymbol} />
            <ExchangeBanner exchangeData={exchange} exchangeMarketData={exchangeMarket} />
            <div className="exchange-market-footer-wrapper">
                <div className="exchange-market">
                    <ExchangeMarketList exchangeMarketData={exchangeMarket} currencyRate={currencyRate} currencySymbol={currencySymbol} />
                    <button className="green" onClick={loadMore} disabled={loading}>
                        {loading === true ?
                            <Spinner animation="border" variant="light" size="sm" role="status"></Spinner>
                            :
                            "View More"
                        }
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    )
}