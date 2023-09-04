import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import CoinHistoryChartExpanded from "../coinHistoryChartExpanded";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import updateButton from "../../update-button-white.png";
import "./style.css";

export default function CoinsList(props) {
    const { currencyRate, currencySymbol, theme } = props;
    const [coins, setCoins] = useState([]);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);
    var NumAbbr = require('number-abbreviate');
    var numAbbr = new NumAbbr(['k', 'm', 'b', 't']);
    const rankSort = (rowA, rowB) => {
        const a = Number(rowA.rank);
        const b = Number(rowB.rank);
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1;
        }
        return 0;
    };
    const caseInsensitiveSort = (rowA, rowB) => {
        const a = rowA.id.toLowerCase();
        const b = rowB.id.toLowerCase();
        if (a > b) {
            return 1;
        }
        if (b > a) {
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
    const marketCapSort = (rowA, rowB) => {
        const a = Number(rowA.marketCapUsd);
        const b = Number(rowB.marketCapUsd);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const vwapSort = (rowA, rowB) => {
        const a = Number(rowA.vwap24Hr);
        const b = Number(rowB.vwap24Hr);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const supplySort = (rowA, rowB) => {
        const a = Number(rowA.supply);
        const b = Number(rowB.supply);
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
    const changeSort = (rowA, rowB) => {
        const a = Number(rowA.changePercent24Hr);
        const b = Number(rowB.changePercent24Hr);
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
            name: "Rank",
            selector: row => row.rank,
            sortable: true,
            maxWidth: "60px",
            sortFunction: rankSort,
            center: true,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            sortFunction: caseInsensitiveSort,
            cell: row => (
                <div className="logo-name">
                    <img src={`https://assets.coincap.io/assets/icons/${row.symbol.toLowerCase()}@2x.png`} />
                    <Link to={`/assets/${row.id}`}>
                        <h4 className="name">{row.name}</h4>
                        <h4 className="light">{row.symbol}</h4>
                    </Link>
                </div>
            ),
        },
        {
            name: "Price",
            selector: row => row.priceUsd,
            format: row => currencySymbol + numberFormat(decimal((row.priceUsd)/currencyRate)),
            sortable: true,
            sortFunction: priceSort,
            maxWidth: "160px",
            right: true,
        },
        {
            name: "Market Cap",
            selector: row => row.marketCapUsd,
            format: row => currencySymbol + numAbbr.abbreviate((row.marketCapUsd)/currencyRate, 2),
            sortable: true,
            sortFunction: marketCapSort,
            maxWidth: "135px",
            right: true,
        },
        {
            name: "VWAP (24Hr)",
            selector: row => row.vwap24Hr,
            format: row => currencySymbol + numberFormat(decimal((row.vwap24Hr)/currencyRate)),
            sortable: true,
            sortFunction: vwapSort,
            maxWidth: "160px",
            right: true,
        },
        {
            name: "Supply",
            selector: row => row.supply,
            format: row => numAbbr.abbreviate(row.supply, 2),
            sortable: true,
            sortFunction: supplySort,
            maxWidth: "100px",
            right: true,
        },
        {
            name: "Volume (24Hr)",
            selector: row => row.volumeUsd24Hr,
            format: row => currencySymbol + numAbbr.abbreviate((row.volumeUsd24Hr)/currencyRate, 2),
            sortable: true,
            sortFunction: volumeSort,
            maxWidth: "145px",
            right: true,
        },
        {
            name: "Change (24Hr)",
            selector: row => row.changePercent24Hr,
            format: row => decimal(row.changePercent24Hr) + "%",
            sortable: true,
            sortFunction: changeSort,
            maxWidth: "145px",
            right: true,
            conditionalCellStyles: [
                {
                    when: row => row.changePercent24Hr >= 0,
                    style: {
                        color: "rgb(24, 198, 131)",
                    },
                },
                {
                    when: row => row.changePercent24Hr < 0,
                    style: {
                        color: "rgb(244, 67, 54)",
                    },
                },
            ]
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
    async function getApi() {
        try {
            setLoading(true);
            const response = await axios.get("https://api.coincap.io/v2/assets", { params: { limit } });
            setCoins(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function decimal(x) {
        return parseFloat(x).toFixed(2);
    };
	function numberFormat(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 2}).format(x);
	};
    function CoinExpander(props) {
        return <CoinHistoryChartExpanded info={props} currencyRate={currencyRate} currencySymbol={currencySymbol} />
    }
    function loadMore() {
        setLoading(true)
        setTimeout(() => {
            setLimit(limit + 40);
        }, 1000)
        setLoading(false)
    };
    useEffect(() => {
        // const interval = setInterval(() => {
            getApi();
        // }, 1000)
        // return () => {clearInterval(interval)}
    }, [limit]);

    return (
        <div className={`coins-list ${theme}`}>
            <div className="container">
                <div className="box">
                    <DataTable
                        columns={columns} data={coins}
                        customStyles={customStyles} defaultSortFieldId={1}
                        expandableRows
                        expandOnRowClicked
                        expandableRowsHideExpander
                        expandableRowsComponent={CoinExpander}
                        pointerOnHover={true}
                        highlightOnHover={true}
                        enableCellChangeFlash={true}
                    />
                </div>
                <button className="green" onClick={loadMore} disabled={loading}>
                    {loading === true
                        ? <Spinner animation="border" variant="light" size="sm" role="status"></Spinner>
                        : "View More"
                    }
                </button>
                <div className="update-button" onClick={getApi}>
                    <img src={updateButton} />
                    <h3>Update!</h3>
                </div>
            </div>
        </div>
    )
}