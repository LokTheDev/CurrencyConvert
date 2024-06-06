import React, { useState, useEffect, useCallback } from 'react';
import DropDown from '../components/dropdown';
import styles from '../css/form.module.css'

export default function Form({ handler }) {

    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");
    const [currency, setCurrenct] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCurrencyList = async () => {
            try {
                const data = await fetch('https://v6.exchangerate-api.com/v6/1138c4737377dce703611405/latest/USD');
                const jsonData = await data.json();
                const { conversion_rates } = jsonData; // Destructure conversion_rates
                const list = Object.keys(conversion_rates).map(key => ({ text: key, value: key }));
                setCurrenct(list);
            } catch (error) {
                setError(true)
            }
        }

        getCurrencyList();
    }, [])

    const formHandler = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const data = await fetch('https://v6.exchangerate-api.com/v6/1138c4737377dce703611405/latest/' + fromValue);
            const jsonData = await data.json();
            handler(jsonData.conversion_rates[toValue])
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    const memoizedSetFromValue = useCallback((value) => {
        setFromValue(value);
    }, []);

    const memoizedSetToValue = useCallback((value) => {
        setToValue(value);
    }, []);

    if (error) {
        return (<h1>Please wait...</h1>)
    }

    return (
        <form onSubmit={formHandler} className={loading ? styles.loading : ""}>
            <DropDown displayText={fromValue} handler={memoizedSetFromValue} options={currency} />
            <p> Convert to </p>
            <DropDown displayText={toValue} handler={memoizedSetToValue} options={currency} />
            <button type='submit'>Convert</button>
        </form>
    );
}