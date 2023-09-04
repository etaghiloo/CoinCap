import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

export default function ExchangeMarketList(props) {
    const { exchangeMarketData, currencyRate, currencySymbol, theme } = props;
    const circle = <FontAwesomeIcon icon={faCircle} />
    var NumAbbr = require('number-abbreviate');
    var numAbbr = new NumAbbr(['k', 'm', 'b', 't']);
    const caseInsensitiveSort = (rowA, rowB) => {
        const a = rowA.baseSymbol.toLowerCase();
        const b = rowB.baseSymbol.toLowerCase();
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1;
        }
        return 0;
    };
    const rateSort = (rowA, rowB) => {
        const a = Number(rowA.priceQuote);
        const b = Number(rowB.priceQuote);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const priceSort = (rowA, rowB) => {
        const a = Number(rowA.priceUsd);
        const b = Number(rowB.priceUsd);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const volumeSort = (rowA, rowB) => {
        const a = Number(rowA.volumeUsd24Hr);
        const b = Number(rowB.volumeUsd24Hr);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const volumePercentSort = (rowA, rowB) => {
        const a = Number(rowA.percentExchangeVolume);
        const b = Number(rowB.percentExchangeVolume);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const tradesSort = (rowA, rowB) => {
        const a = Number(rowA.tradesCount24Hr);
        const b = Number(rowB.tradesCount24Hr);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const columns = [
        {
            name: "Pair",
            selector: row => row.baseSymbol + "/" + row.quoteSymbol,
            sortable: true,
            sortFunction: caseInsensitiveSort,
            maxWidth: "150px",
            cell: row => (
                <div className="pairs">
                    <Link to={`/assets/${row.baseId}`}>
                        <h4>{row.baseSymbol}</h4>
                    </Link>
                    <span>/</span>
                    <Link to={`/assets/${row.quoteId}`}>
                       <h4>{row.quoteSymbol}</h4>
                    </Link>
                </div>
            ),
        },
        {
            name: "Rate",
            selector: row => row.priceQuote,
            format: row => decimalFour(row.priceQuote),
            sortable: true,
            sortFunction: rateSort,
            maxWidth: "180px",
            right: true,
        },
        {
            name: "Price",
            selector: row => row.priceUsd,
            format: row => currencySymbol + numberFormat(decimal(row.priceUsd/currencyRate)),
            sortable: true,
            sortFunction: priceSort,
            maxWidth: "170px",
            right: true,
        },
        {
            name: "Volume (24Hr)",
            selector: row => row.volumeUsd24Hr,
            format: row => currencySymbol + numAbbr.abbreviate(decimal(row.volumeUsd24Hr/currencyRate), 2),
            sortable: true,
            sortFunction: volumeSort,
            maxWidth: "180px",
            right: true,
        },
        {
            name: "Volume (%)",
            selector: row => row.percentExchangeVolume,
            format: row => decimal(row.percentExchangeVolume) + "%",
            sortable: true,
            sortFunction: volumePercentSort,
            maxWidth: "130px",
            right: true,
        },
        {
            name: "Trades (24Hr)",
            selector: row => row.tradesCount24Hr,
            format: row => numberFormat(row.tradesCount24Hr),
            sortable: true,
            sortFunction: tradesSort,
            maxWidth: "140px",
            right: true,
        },
        {
            name: "Charts",
            selector: row => row.chart,
            maxWidth: "90px",
            center: true,
        },
        {
            name: "Status",
            selector: row => row.socket,
            sortable: true,
            maxWidth: "90px",
            center: true,
            cell: row => (
                <div className="status-availability">{circle}</div>
            ),
        },
    ];
    const customStyles = {
        headRow: {
            style: {
                minHeight: "44px",
                fontSize: "14px",
                fontWeight: 400,
                color: theme === "dark" ? "#8a8a8a" : "#00000099",
                backgroundColor: theme === "dark" ? "#000" : "#fafafa",
            },
        },
        headCells: {
            style: {
                '&:hover': {
                    color: theme === "dark" ? "#fff" : "#000",
                },
            },
        },
        rows: {
            style: {
                minHeight: "58px",
                fontSize: "14px",
                fontWeight: 400,
                color: theme === "dark" ? '#fff' : '#000',
                backgroundColor: theme === "dark" ? "rgb(54, 54, 54)" : "#fff",
                transitionDuration: '0.2s',
                transitionProperty: 'background-color',
            },
            highlightOnHoverStyle: {
                backgroundColor: theme === "dark" ? "rgb(37, 37, 37)" : "rgba(0, 0, 0, 0.12)",
                borderBottomColor: theme === "dark" ? "rgb(37, 37, 37)" : "rgba(0, 0, 0, 0.12)",
                outlineColor: theme === "dark" ? "rgb(37, 37, 37)" : "rgba(0, 0, 0, 0.12)",
                color: theme === "dark" ? '#fff' : '#000',
            }
        },
        expanderRow: {
            style: {
                color: theme === "dark" ? '#fff' : '#000',
                backgroundColor: theme === "dark" ? "rgb(54, 54, 54)" : "#fff",
            },
        },
    };
    function decimal(x) {
        return parseFloat(x).toFixed(2);
    };
    function decimalFour(x) {
        return parseFloat(x).toFixed(4);
    };
	function numberFormat(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 2}).format(x);
	};
    
    return (
        <div className={`exchange-market-list ${theme}`}>
            <div className="container">
                <div className="box">
                    <DataTable
                        columns={columns} data={exchangeMarketData}
                        customStyles={customStyles} defaultSortFieldId={4} 
                        pointerOnHover={true}
                        highlightOnHover={true}
                    />
                </div>
            </div>
        </div>
    )
}