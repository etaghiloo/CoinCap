import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function TopPair(props) {
    const { exchangeId } = props;
    const [exchangeMarket, setExchangeMarket] = useState([]);
    const [limit, setLimit] = useState(2000);
    const [loading, setLoading] = useState(false);
    const allVolumes = volumes(exchangeMarket);
    const topIndex = topVolumeIndex(allVolumes);
    const topPairBaseSymbol = exchangeMarket[topIndex]?.baseSymbol;
    const topPairQuoteSymbol = exchangeMarket[topIndex]?.quoteSymbol;
    async function getApiExchangeMarket() {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.coincap.io/v2/markets`, { params: { exchangeId, limit } });
            setExchangeMarket(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function volumes(e) {
        return (e.map(function(o) { return o.volumeUsd24Hr; })).map(Number);
    };
    function topVolumeIndex(e) {
        return e.indexOf(Math.max.apply(Math, e));
    };
    useEffect(() => {
        getApiExchangeMarket();
    }, [limit, exchangeId]);
    
    return (
        <>{topPairBaseSymbol}/{topPairQuoteSymbol}</>
    )
}