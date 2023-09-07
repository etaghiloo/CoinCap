import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function CoinBanner(props) {
    const { data, currencyRate, currencySymbol, theme } = props;
    const caretUp = <FontAwesomeIcon icon={faCaretUp} />
    const caretDown = <FontAwesomeIcon icon={faCaretDown} />
    var NumAbbr = require('number-abbreviate');
    var numAbbr = new NumAbbr(['k', 'm', 'b', 't']);
    function decimal(x) {
        return parseFloat(x).toFixed(2);
    };
	function numberFormat(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 2}).format(x);
	};

    return (
        <div className={`coin-banner ${theme}`}>
            <div className="container-orig">
                <div className="coin-banner-wrapper">
                    <div className="info-left">
                        <div className="rank">
                            <h1>{data.rank}</h1>
                            <h5>RANK</h5>
                        </div>
                        <div className="nspc">
                            <div className="name-symbol">
                                <h1>{data.name}</h1>
                                <h1>({data.symbol})</h1>
                            </div>
                            <div className="price-change">
                                <h2>{currencySymbol + numberFormat(decimal(data.priceUsd/currencyRate))}</h2>
                                {data.changePercent24Hr >= 0
                                    ? 
                                    <div className="change-green">
                                        <h3>{decimal(data.changePercent24Hr)}%</h3>
                                        <i>{caretUp}</i>
                                    </div>
                                    :
                                    <div className="change-red">
                                        <h3>{decimal(data.changePercent24Hr)}%</h3>
                                        <i>{caretDown}</i>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="info-right">
                        <div className="market-website">
                            <div className="market">
                                <h4>Market Cap</h4>
                                <h3>{currencySymbol + numAbbr.abbreviate(data.marketCapUsd/currencyRate, 2)}</h3>
                            </div>
                            <Link>
                                <button className="green">Website</button>
                            </Link>
                        </div>
                        <div className="volume-explorer">
                            <div className="volume">
                                <h4>Volume (24Hr)</h4>
                                <h3>{currencySymbol + numAbbr.abbreviate(data.volumeUsd24Hr/currencyRate, 2)}</h3>
                            </div>
                            <Link>
                                <button className="green">Explorer</button>
                            </Link>
                        </div>
                        <div className="supply">
                            <h4>Supply</h4>
                            <h3>{numAbbr.abbreviate(data.supply, 2)} BTC</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}