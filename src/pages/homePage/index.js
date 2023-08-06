import { useState, useEffect } from "react";
import ShapeShiftHeader from "../../components/shapeShiftHeader";
import Header from "../../components/header";
import HomeBanner from "../../components/homeBanner";
import CoinsList from "../../components/coinsList";
import Footer from "../../components/footer";
import "./style.css";

export default function Home() {
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();
    useEffect(() => {
        document.title = `CoinCap.io | Reliable Cryptocurrency Prices and Market Capitalizations`;
    }, []);
    
    return (
        <div className="home-page">
            <ShapeShiftHeader />
            <Header secondRateTransfer={setCurrencyRate} secondSymbolTransfer={setCurrencySymbol} />
            <HomeBanner currencyRate={currencyRate} currencySymbol={currencySymbol} />
            <div className="coins-footer-wrapper">
                <div className="coins">
                    <CoinsList currencyRate={currencyRate} currencySymbol={currencySymbol} />
                </div>
                <Footer />
            </div>
        </div>
    )
}