import { useState, useEffect } from "react";
import axios from "axios";
import Select, { components } from "react-select";
import "./style.css";

export default function Rates(props) {
    const { firstRateTransfer, firstSymbolTransfer } = props;
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        const savedItem = localStorage.getItem("currency");
        const parsedItem = JSON.parse(savedItem);
        return parsedItem || "";
    });
    const currencyRate = rateUsdCollector(selectedCurrency) || 1;
    const currencySymbol = symbolCollector(selectedCurrency) || "$";
    const formatOptionLabel = ({ id, symbol }) => (
        <div>
            <div className="id">{titleCase(id)}</div>
            <div className="symbol">{symbol}</div>
        </div>
    );
    const SingleValue = ({...props}) => (
        <components.SingleValue {...props}>
            <span>{props.data.symbol}</span>
        </components.SingleValue>
    );
    async function getApi() {
        try {
            setLoading(true);
            const response = await axios.get("https://api.coincap.io/v2/rates");
            setRates(response.data.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };
    function rateUsdCollector(e) {
        return e?.rateUsd
    };
    function symbolCollector(e) {
        if(e?.currencySymbol !== null) {
            return e?.currencySymbol;
        } else {
            return "";
        }
    };
    function titleCase(str) {
        var splitStr = str.toLowerCase().split('-');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' '); 
    };
    useEffect(() => {
        getApi();
    }, []);
    useEffect(() => {
        firstRateTransfer(currencyRate);
    }, [currencyRate]);
    useEffect(() => {
        firstSymbolTransfer(currencySymbol);
    }, [currencySymbol]);
    useEffect(() => { 
        localStorage.setItem("currency", JSON.stringify(selectedCurrency));
    }, [selectedCurrency]);

    return (
        <div className="rates-drop-down">
            <Select
                options={rates}
                formatOptionLabel={formatOptionLabel}
                placeholder="USD"
                value={selectedCurrency}
                getOptionValue ={(option) => option.symbol}
                onChange={setSelectedCurrency}
                isSearchable={true}
                components={{ SingleValue }}
                styles={{
                    indicatorSeparator: (base) => ({
                        ...base,
                        display: 'none',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        fontSize: '0.8rem',
                        color: 'black',
                        textAlign: 'right',
                    }),
                    input: (base) => ({
                        ...base,
                        color: 'black',
                        fontSize: '0.8rem',
                        width: '50px',
                    }),
                    control: (baseStyles) => ({
                        ...baseStyles,
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                    }),
                    menuList: (base) => ({
                        ...base,
                        color: 'grey',
                        fontSize: '0.8rem',
                        textAlign: 'left',
                        width: '320px',
                        backgroundColor: 'white',
                        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 15px -3px',
                        cursor: 'pointer',
                        marginTop: '-5px',
                    }),
                    singleValue: (base, state) => ({
                        ...base,
                        color: state.isSelected ? 'grey' : 'black',
                        fontSize: '0.8rem',
                        height: '1.2rem',
                    }),
                    option: (base, state) => ({
                        ...base,
                        color: 'black',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        backgroundColor: state.isSelected ? 'rgba(230, 230, 230, 0.5)' : 'white',
                        fontWeight: state.isSelected ? 'bold' : 'normal',
                        ':hover': {
                            backgroundColor: 'rgba(230, 230, 230, 0.8)',
                        },
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        width: '70px',
                        textAlign: 'right',
                        fontSize: '0.8rem',
                    }),
                }}
            />
        </div>
    )
}