import React from "react";
import '../index.css'

const Rate = ({ exchangeRateData, convert }) => {
    return (
        <div className="exchange-rate">
            <h1>ExchangeRate: {exchangeRateData.exchangeRate}</h1>
            <p>From {exchangeRateData.primaryExchangecurrency} To {exchangeRateData.secondaryExchangecurrency}</p>
        </div>
    )
}

export default Rate
