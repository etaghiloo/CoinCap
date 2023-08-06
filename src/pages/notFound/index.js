import { useState } from "react";
import ShapeShiftHeader from "../../components/shapeShiftHeader";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style.css";

export default function NotFound() {
    const [currencyRate, setCurrencyRate] = useState();
    const [currencySymbol, setCurrencySymbol] = useState();

    return (
        <div className="not-found-page">
            <ShapeShiftHeader />
            <Header secondRateTransfer={setCurrencyRate} secondSymbolTransfer={setCurrencySymbol} />
            <div className="container">
                <div className="not-found-wrapper">
                    <h2>404</h2>
                    <div className="line"></div>
                    <h4>This page could not be found.</h4>
                </div>
            </div>
            <Footer />
        </div>
    )
}