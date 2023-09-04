import { useState } from "react";
import Select from "react-select";

export default function LanguageSelector(props) {
    const { theme } = props;
    const languages = [
        {
            value: "English",
            label: "English"
        },
        {
            value: "Turkish",
            label: "Turkish"
        },
        {
            value: "Espanol",
            label: "Espanol"
        },
        {
            value: "French",
            label: "French"
        },
        
    ];
    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <div className={`language-drop-down ${theme}`}>
            <Select
                options={languages}
                placeholder="English"
                value={selectedLanguage}
                getOptionValue ={(option) => option.value}
                onChange={setSelectedLanguage}
                isSearchable={true}
                styles={{
                    indicatorSeparator: (base) => ({
                        ...base,
                        display: 'none',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        fontSize: '0.8rem',
                        color: theme === "dark" ? 'white' : 'black',
                        textAlign: 'right',
                    }),
                    input: (base) => ({
                        ...base,
                        color: theme === "dark" ? 'white' : 'black',
                        fontSize: '0.8rem',
                        width: '50px',
                    }),
                    control: (baseStyles) => ({
                        ...baseStyles,
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        background: 'transparent',
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
                        color: theme === "dark" ? 'white' : 'black',
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