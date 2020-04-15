import React, { useState, useEffect } from 'react';
import FoundCountries from './components/FoundCountries'
import Axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {setCountries(response.data)})
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={filter} onChange={handleFilterChange}></input>
      </form>
      <div>
        <FoundCountries 
          countries={countries} 
          filter={filter} 
          setFilter={setFilter} 
          api_key={api_key}
        />
      </div>
    </div>
  )
}

export default App
