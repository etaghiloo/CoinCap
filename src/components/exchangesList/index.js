import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import TopPair from "../topPair";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function ExchangesList(props) {
    const { exchangesData, currencyRate, currencySymbol } = props;
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
            sortFunction: rankSort,
            center: true,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            sortFunction: caseInsensitiveSort,
            // ignoreRowClick: true,
            // maxWidth: "300px",
            // cell: row => (
            //     <Link to={`/exchanges/${row.exchangeId}`}>
            //       {row.name}
            //     </Link>
            // ),
            // cell: row => (
            //     <div data-tag="allowRowEvents">
            //       <div aria-hidden="true" onClick={e => onRowClick(e, row.exchangeId)}>
            //         {row.name}
            //       </div>
            //     </div>
            // ),
        },
        {
            name: "Trading Pairs",
            selector: row => row.tradingPairs,
            sortable: true,
            maxWidth: "150px",
            right: true,
            sortFunction: pairsSort,
        },
        {
            name: "Top Pair",
            selector: row => <TopPair exchangeId={row.exchangeId}/>,
            sortable: true,
            maxWidth: "180px",
            right: true,
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
            right: true,
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
        rows: {
            style: {
                minHeight: "44px",
                fontSize: "14px",
                fontWeight: 400,
            },
        },
        headRow: {
            style: {
                minHeight: "44px",
                fontSize: "14px",
                fontWeight: 400,
                color: "#00000099",
                backgroundColor: "#fafafa",
            },
        },
    };
    function decimal(x) {
        return parseFloat(x).toFixed(2);
    };
    
    return (
        <div className="exchanges-list">
            <div className="container">
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