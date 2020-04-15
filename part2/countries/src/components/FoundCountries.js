import React, { useState } from 'react';
import Axios from 'axios';

const FoundCountries = ({ countries, filter, setFilter, api_key }) => {
    const [weather, setWeather] = useState([])
    const found = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

    const showCountry = (name) => {
        setFilter(name)
    }

    // Empty input field
    if (filter === '') {
        return <div>Please type in the name of a country</div>
    }
    // Filter does not match any country name
    else if (found.length === 0) {
        return <div>No such country found</div>
    }
    // Only one match was found
    else if (found.length === 1) {
        const country = found[0]

        Axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then((response) => {
                const weatherData = response.data
                setWeather(weatherData)
            })

        return (
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                <ul>
                    {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt={country.name} width='200px'></img>
                <h2>Weather in {country.capital}</h2>
                <div>temperature {weather.current.temperature}</div>
                <img src={weather.current.weather_icons[0]}></img>
                <div>
                    <b>wind: </b>
                    {weather.current.wind_speed} mph direction {weather.current.wind_dir}
                </div>
            </div>
        )
    }
    // Over ten matches were found
    else if (found.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    // Between 2 and 10 matches were found
    else {
        return (
            <div>
                {found.map((country, i) =>
                    <div key={i}>
                        {country.name}
                        <button onClick={() => showCountry(country.name)}>show</button>
                    </div>
                )}
            </div>
        )
    }
}

export default FoundCountries