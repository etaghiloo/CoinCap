import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function CoinMarketsList(props) {
    const { marketsData, currencyRate, currencySymbol, theme } = props;
    const circle = <FontAwesomeIcon icon={faCircle} />
    const navigate = useNavigate();
    const accessExchange = (row) => {
        navigate(`/exchanges/${row.exchangeId}`);
    };
    const caseInsensitiveSort = (rowA, rowB) => {
        const a = rowA.exchangeId.toLowerCase();
        const b = rowB.exchangeId.toLowerCase();
        if (a > b) {
            return 1;
        }
        if (b > a) {
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
        const a = Number(rowA.volumePercent);
        const b = Number(rowB.volumePercent);
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
            name: "Exchange",
            selector: row => row.exchangeId,
            sortable: true,
            sortFunction: caseInsensitiveSort,
            maxWidth: "220px",
        },
        {
            name: "Pair",
            selector: row => row.baseSymbol + "/" + row.quoteSymbol,
            maxWidth: "180px",
            right: true,
        },
        {
            name: "Price",
            selector: row => row.priceUsd,
            format: row => currencySymbol + numberFormat(decimal(row.priceUsd/currencyRate)),
            sortable: true,
            maxWidth: "190px",
            right: true,
        },
        {
            name: "Volume (24Hr)",
            selector: row => row.volumeUsd24Hr,
            format: row => currencySymbol + numberFormat(decimal(row.volumeUsd24Hr/currencyRate)),
            sortable: true,
            sortFunction: volumeSort,
            maxWidth: "270px",
            right: true,
        },
        {
            name: "Volume (%)",
            selector: row => row.volumePercent,
            format: row => decimal(row.volumePercent) + "%",
            sortable: true,
            sortFunction: volumePercentSort,
            maxWidth: "170px",
            right: true,
        },
        {
            name: "Status",
            selector: row => row.socket,
            sortable: true,
            maxWidth: "100px",
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
        return Number.parseFloat(x).toFixed(2);
    };
	function numberFormat(x) {
		return Intl.NumberFormat(undefined, {minimumFractionDigits: 2}).format(x);
	};
    
    return (
        <div className={`markets-list ${theme}`}>
            <div className="container">
                <div className="box">
                        <DataTable
                            columns={columns} data={marketsData}
                            customStyles={customStyles} defaultSortFieldId={4}
                            pointerOnHover={true}
                            highlightOnHover={true}
                            onRowClicked={accessExchange}
                        />
                </div>
            </div>
        </div>
    )
}