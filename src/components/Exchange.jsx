import React from 'react'
import '../index.css'
import { useState, } from 'react'
import axios from 'axios'
import Rate from './Rate'


const Exchange = () => {
    const cryptoCurrencies = ['BTC', 'ETH', 'LTC', 'XRP', 'BNB']
    const currencies = ['USD', 'NGN']
    const [amount, setAmount] = useState(0)
    const [primaryChosenCurrency, setPrimaryChosenCurrency] = useState('BTC')
    const [secondaryChosenCurrency, setSecondaryChosenCurrency] = useState('USD')
    const [result, setResult] = useState(0)
    const [exchangeRateData, setExchangeRateData] = useState({
        primaryExchangecurrency: '',
        secondaryExchangecurrency: '',
        exchangeRate: 0
    })
    // console.log(primaryChosenCurrency)
    // console.log(secondaryChosenCurrency)
    const convert = () => {
        var options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: { from_currency: primaryChosenCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: secondaryChosenCurrency },
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': 'cd70deb726msh5da57583305a4a0p138b03jsnfae7a783bd44'
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(Math.floor(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']) * amount)
            setExchangeRateData({
                primaryExchangecurrency: primaryChosenCurrency,
                secondaryExchangecurrency: secondaryChosenCurrency,
                exchangeRate: Math.floor(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            })
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="converter">
            <h1>Currency Converter</h1>
            <div className="input-currency">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency:</td>
                            <td>
                                <input type="number"
                                    value={amount}
                                    name="currency-amount"
                                    onChange={e => setAmount(e.target.value)} />
                                <select value={primaryChosenCurrency} onChange={e => setPrimaryChosenCurrency(e.target.value)}>
                                    {cryptoCurrencies.map((cyrptoCurrency, _index) => (
                                        <option key={_index}>{cyrptoCurrency}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency:</td>
                            <td>
                                <input type="number"
                                    value={result}
                                    name="result"
                                    disabled={true} />
                                <select
                                    value={secondaryChosenCurrency}
                                    onChange={e => setSecondaryChosenCurrency(e.target.value)}>
                                    {currencies.map((currency, _index) => (
                                        <option key={_index}>{currency}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={convert}>Convert</button>
                <Rate exchangeRateData={exchangeRateData} convert={convert} />
            </div>
            <div className="about">
                <h3><u>About Site</u></h3>
                <p>This is a website for converting cryptocurrencies and also checking exchange rates of coins to USD(Dollar) and NGN(Nigerian Naira).</p>
                <p>All Api used in this project is from RapidApi.</p>
                <p>Note: This is not a live website, but a Project Website to build Portfolio and to show my Frontend Skills Set.</p>
            </div>
        </div>
    )
}

export default Exchange
