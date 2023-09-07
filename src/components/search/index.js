import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

export default function Search() {
    const [coinResult, setCoinResult] = useState([]);
    const [exchangeResult, setExchangeResult] = useState([]);
    const [close, setClose] = useState(true);
    const [input, setInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedOnChange = debounce(onSearch, 200);
    const magnifyingGlass = <FontAwesomeIcon icon={faMagnifyingGlass} />
    const inputRef = useRef(null);
    const resultRef = useRef(null);
    useEffect(() => {
        let handler = (e) => {
            if (!resultRef.current.contains(e.target)) {
                setClose(true);
                setInput(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);
    function onSearch(e) {
        setLoading(true);
        const value = e.target.value;
        if ( value.trim() !== "") {
            setTimeout(() => {
                axios.get("https://api.coincap.io/v2/assets", { params: { search: value } }).then(function(response) {
                    setCoinResult(response.data.data);
                });
                axios.get("https://api.coincap.io/v2/exchanges", { params: { search: value } }).then(function(response) {
                    setExchangeResult(response.data.data);  
                });
                setClose(false);
                setLoading(false);
            }, 500)
        } else {
            setClose(true);
            setLoading(false);
        }
    };
    function showInput() {
        setInput(true);

        // not working :(
        inputRef.current.focus();
    };
    function timeLoopCoins() {
        return coinResult.slice(0, 5).map((coin) => {
            const {id, rank, name, symbol} = coin;
            const idnew = id.replace(/\s+/g, '-').toLowerCase();
            return (
                <li key={rank}>
                    <Link to={`/assets/${idnew}`}>
                        <h4 className="light">{name} ({symbol})</h4>
                    </Link>
                </li>
            )
        })
    };
    function timeLoopExchanges() {
        return exchangeResult.slice(0, 5).map((exchanges) => {
            const {exchangeId, rank, name} = exchanges;
            const exchangeIdnew = exchangeId.replace(/\s+/g, '-').toLowerCase();
            return (
                <li key={rank}>
                    <Link to={`/exchanges/${exchangeIdnew}`}>
                        <h4 className="light">{name}</h4>
                    </Link>
                </li>
            )
        })
    };

    return (
        <div ref={resultRef}>
            <div className={`search-bar ${input === true ? "active" : "inactive"}`}>
                <input
                    id="input"
                    type="text"
                    className={`${input === true ? "active" : "inactive"}`}
                    onChange={(e) => debouncedOnChange(e)}
                    ref={inputRef}
                />
                {loading === false
                    ? <i onClick={showInput}>{magnifyingGlass}</i>
                    : <Spinner className="spinner" animation="border" size="sm" variant="secondary"></Spinner>
                }
            </div>
            <div className={`result ${close === false ? "active" : "inactive"}`}>
                <h3>Assets</h3>
                <ul>
                    {timeLoopCoins()}
                </ul>
                <h3 className="exchanges">Exchanges</h3>
                <ul>
                    {timeLoopExchanges()}
                </ul>
            </div>
        </div>
    )
}