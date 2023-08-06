import { Link } from "react-router-dom";
import "./style.css";

export default function ShapeShiftHeader() {
    return (
        <div className="shapeshift-header">
            <Link to={`https://app.shapeshift.com/?utm_source=CoinCap&utm_medium=Banner&utm_campaign=Buy+%26+Sell#/connect-wallet?returnUrl=/buy-crypto`} target="_blank">
                <img src={`https://coincap.io/static/logos/ss-mark-white.svg`} />
                <h4>Buy, sell, & swap your favorite assets. No KYC. No added fees. Decentralized.</h4>
                <i className="fa-sharp fa-solid fa-arrow-right"></i>
            </Link>
        </div>
    )
}