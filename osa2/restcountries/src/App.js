import { useEffect, useState } from "react";
import countryData from './services/countrydata'
import Search from './components/Search'
import Countries from "./components/Countries";
import Information from "./components/Information";

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [error, setError] = useState(false)
  const [rawData, setRawData] = useState([])

  // Haetaan maiden tiedot palvelimelta
  useEffect(() => {
    countryData
      .getAll()
      .then(initialData => {
        console.log('Data imported from the server')
        setRawData(initialData);
        setCountries(initialData.map(data => data.name.common))
      })
  }, [])

  // searchValue tilan käsittelijä
  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  // Määritetään hakua vastaavat maat
  const countriesToShow = countries.filter(country => country.toLowerCase().includes(searchValue.toLowerCase()))
 
  // Asetetaan error arvon tila
  useEffect(() => {
    if (countriesToShow.length > 10) {
      setError(true)
      //console.log('Error is true')
    }
    else {
      setError(false)
      //console.log('Error is false')
    }
  }, [searchValue])


  return (
    <div>
      <Search 
        text="Find countries " 
        searchValue={searchValue}
        handleChange={handleChange}
      />
      <Countries 
        countryData={countriesToShow} 
        search={searchValue} 
        error={error}  
        setSearchValue={setSearchValue}
      />
      <Information 
        countryData={countriesToShow} 
        rawData={rawData}
      />
    </div>
  )
}

export default App;