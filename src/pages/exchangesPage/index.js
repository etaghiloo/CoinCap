import axios from "axios";
import { useState, useEffect } from "react";
import ShapeShiftHeader from "../../components/shapeShiftHeader";
import Header from "../../components/header";
import HomeBanner from "../../components/homeBanner";
import ExchangesList from "../../components/exchangesList";
import Footer from "../../components/footer";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

export default function Exchanges() {
    const [exchanges, setExchanges] = useState([]);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    const [theme, setTheme] = useState();
    async function getApi() {
        try {
            setLoading(true);
            const response = await axios.get("https://api.coincap.io/v2/exchanges", { params: { limit } });
            setExchanges(response.data.data);
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
    useEffect(() => {
        document.title = `Exchanges | CoinCap.io`;
    }, []);
    useEffect(() => {
        getApi();
    }, [limit]);

    return (
        <div className={`exchanges-page ${theme}`}>
            <ShapeShiftHeader />
            <Header secondRateTransfer={setCurrencyRate} secondSymbolTransfer={setCurrencySymbol} themeTransfer={setTheme} />
            <HomeBanner currencyRate={currencyRate} currencySymbol={currencySymbol} theme={theme} />
            <div className="exchanges-footer-wrapper">
                <div className="exchanges">
                    <ExchangesList exchangesData={exchanges} currencyRate={currencyRate} currencySymbol={currencySymbol} theme={theme} />
                    <button className="green" onClick={loadMore} disabled={loading}>
                        {loading === true
                            ? <Spinner animation="border" variant="light" size="sm" role="status"></Spinner>
                            : "View More"
                        }
                    </button>
                </div>
                <Footer theme={theme} />
            </div>
        </div>
    )
}