import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import TopPair from "../topPair";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../customHooks/useWindowSize";
import "./style.css";

export default function ExchangesList(props) {
    const { exchangesData, currencyRate, currencySymbol, theme } = props;
    const [hideFourColumns, setHideFourColumns] = useState(false);
    const windowWidth = useWindowSize();
    const circle = <FontAwesomeIcon icon={faCircle} />
    const navigate = useNavigate();
    const accessExchange = (row) => {
        navigate(`/exchanges/${row.exchangeId}`);
    };
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
        const a = rowA.name.toLowerCase();
        const b = rowB.name.toLowerCase();
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1;
        }
        return 0;
    };
    const pairsSort = (rowA, rowB) => {
        const a = Number(rowA.tradingPairs);
        const b = Number(rowB.tradingPairs);
        if (a < b) {
            return 1;
        }
        if (b < a) {
            return -1;
        }
        return 0;
    };
    const volumeSort = (rowA, rowB) => {
        const a = Number(rowA.volumeUsd);
        const b = Number(rowB.volumeUsd);
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
            maxWidth: "80px",
            minWidth: windowWidth <= 950 ? "80px" : "100px",
            sortFunction: rankSort,
            center: true,
            omit: hideFourColumns,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            sortFunction: caseInsensitiveSort,
        },
        {
            name: "Trading Pairs",
            selector: row => row.tradingPairs,
            sortable: true,
            maxWidth: "150px",
            minWidth: "90px",
            right: true,
            sortFunction: pairsSort,
        },
        {
            name: "Top Pair",
            selector: row => <TopPair exchangeId={row.exchangeId}/>,
            sortable: true,
            maxWidth: "180px",
            right: true,
            omit: hideFourColumns,
        },
        {
            name: "Volume (24Hr)",
            selector: row => row.volumeUsd,
            format: row => currencySymbol + numAbbr.abbreviate(row.volumeUsd/currencyRate, 2),
            sortable: true,
            sortFunction: volumeSort,
            maxWidth: "180px",
            right: true,
        },
        {
            name: "Total (%)",
            selector: row => row.percentTotalVolume,
            format: row => decimal(row.percentTotalVolume) + "%",
            sortable: true,
            maxWidth: "120px",
            minWidth: windowWidth <= 950 ? "77px" : "100px",
            right: true,
            omit: hideFourColumns,
        },
        {
            name: "Status",
            selector: row => row.socket,
            sortable: true,
            maxWidth: "90px",
            minWidth: windowWidth <= 950 ? "90px" : "100px",
            center: true,
            omit: hideFourColumns,
            cell: row => (
                <div className="status-availability">{circle}</div>
            ),
            conditionalCellStyles: [
                {
                    when: row => row.socket === true,
                    style: {
                        color: "rgb(24, 198, 131)",
                    },
                },
                {
                    when: row => row.socket === false,
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
                paddingLeft: windowWidth <= 950 ? "8px" : "16px",
                paddingRight: windowWidth <= 950 ? "8px" : "16px",
                fontSize: windowWidth <= 950 ? "11.5px" : "14px",
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
                paddingLeft: windowWidth <= 950 ? "8px" : "16px",
                paddingRight: windowWidth <= 950 ? "8px" : "16px",
            }
        }
    };
    function decimal(x) {
        return parseFloat(x).toFixed(2);
    };
    useEffect(() => {
        if (windowWidth <= 770) {
            setHideFourColumns(true);
        } else {
            setHideFourColumns(false);
        }
    }, [windowWidth]);

    return (
        <div className={`exchanges-list ${theme}`}>
            <div className="container-orig">
                <div className="box">
                        <DataTable
                            columns={columns} data={exchangesData}
                            customStyles={customStyles} defaultSortFieldId={1}
                            pointerOnHover={true}
                            highlightOnHover={true}
                            onRowClicked={accessExchange}
                        />
                </div>
            </div>
        </div>
    )
}