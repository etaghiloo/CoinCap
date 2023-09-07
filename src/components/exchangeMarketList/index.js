import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from "../../customHooks/useWindowSize";
import "./style.css";

export default function ExchangeMarketList(props) {
    const { exchangeMarketData, currencyRate, currencySymbol, theme } = props;
    const circle = <FontAwesomeIcon icon={faCircle} />
    const [hideFiveColumns, setHideFiveColumns] = useState(false);
    const windowWidth = useWindowSize();
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
            maxWidth: "475px",
            minWidth: "90px",
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
            format: row => decimal(row.priceQuote),
            sortable: true,
            sortFunction: rateSort,
            maxWidth: windowWidth <= 950 ? "90px" : "120px",
            minWidth: "81px",
            right: true,
        },
        {
            name: "Price",
            selector: row => row.priceUsd,
            format: row => currencySymbol + numberFormat(decimal(row.priceUsd/currencyRate)),
            sortable: true,
            sortFunction: priceSort,
            maxWidth: "170px",
            minWidth: windowWidth > 950 ? "145px" : "100px",
            right: true,
            omit: hideFiveColumns,
        },
        {
            name: "Volume (24Hr)",
            selector: row => row.volumeUsd24Hr,
            format: row => currencySymbol + numAbbr.abbreviate(decimal(row.volumeUsd24Hr/currencyRate), 2),
            sortable: true,
            sortFunction: volumeSort,
            maxWidth: "180px",
            minWidth: "110px",
            right: true,
        },
        {
            name: "Volume (%)",
            selector: row => row.percentExchangeVolume,
            format: row => decimal(row.percentExchangeVolume) + "%",
            sortable: true,
            sortFunction: volumePercentSort,
            maxWidth: 950 < windowWidth <= 1100 ? "105px" : "120px",
            maxWidth: windowWidth <= 950 ? "90px" : "120px",
            minWidth: "80px",
            right: true,
            omit: hideFiveColumns,
        },
        {
            name: "Trades (24Hr)",
            selector: row => row.tradesCount24Hr,
            format: row => numberFormatNoDecimal(row.tradesCount24Hr),
            sortable: true,
            sortFunction: tradesSort,
            maxWidth: "135px",
            minWidth: "101px",
            right: true,
            omit: hideFiveColumns,
        },
        {
            name: "Charts",
            selector: row => row.chart,
            maxWidth: windowWidth <= 1100 ? "70px" : "90px",
            minWidth: "70px",
            center: true,
            omit: hideFiveColumns,
        },
        {
            name: "Status",
            selector: row => row.socket,
            sortable: true,
            maxWidth: windowWidth <= 1100 ? "75px" : "90px",
            minWidth: "70px",
            center: true,
            omit: hideFiveColumns,
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
                fontSize: windowWidth <= 950 ? "11.5px" : "14px",
                paddingLeft: windowWidth <= 1100 ? "8px" : "16px",
                paddingRight: windowWidth <= 1100 ? "8px" : "16px",
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
        cells: {
            style: {
                fontSize: windowWidth <= 430 ? "12px" : "14px",
                paddingLeft: windowWidth <= 1100 ? "8px" : "16px",
                paddingRight: windowWidth <= 1100 ? "8px" : "16px",
            }
        }
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
    function numberFormatNoDecimal(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 0}).format(x);
	};
    useEffect(() => {
        if (windowWidth <= 770) {
            setHideFiveColumns(true);
        }
        else {
            setHideFiveColumns(false);
        }
    }, [windowWidth]);

    return (
        <div className={`exchange-market-list ${theme}`}>
            <div className="container-orig">
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