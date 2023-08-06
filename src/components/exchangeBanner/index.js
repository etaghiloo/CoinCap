import { Link } from "react-router-dom";
import TopPair from "../topPair";
import "./style.css";

export default function ExchangeBanner(props) {
    const { exchangeData } = props;
    const exchangeId = exchangeData.exchangeId;
	function numberFormat(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 2}).format(x);
	};

    return (
        <div className="exchange-banner">
            <div className="container">
                <div className="exchange-banner-wrapper">
                    <div className="info-left">
                        <div className="rank">
                            <h1>{exchangeData.rank}</h1>
                            <h5>RANK</h5>
                        </div>
                        <div className="name-pairs">
                            <div className="name">
                                <h1>{exchangeData.name}</h1>
                            </div>
                            <div className="pairs">
                                <h1>{exchangeData.tradingPairs}</h1>
                                <h3>Pairs</h3>
                            </div>
                        </div>
                    </div>
                    <div className="volume-website">
                        <div className="volume">
                            <h4>Volume (24Hr)</h4>
                            <h3>{"$" + numberFormat((exchangeData.volumeUsd))}</h3>
                        </div>
                        <Link to={exchangeData.exchangeUrl}>
                            <button className="green"><h4>Website</h4></button>
                        </Link>
                    </div>
                    <div className="top-pair">
                        <h4>Top Pair</h4>
                        <h3><TopPair exchangeId={exchangeId}/></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}