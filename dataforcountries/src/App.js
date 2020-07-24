import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Specific = ({show}) =>{
  return(
    <div>
        <h1>{show[0].name}</h1>
        <div>Capital {show[0].capital}</div>
        <div>Population {show[0].population}</div>
        <h3>languages</h3>
        <div>
          <ul>
          {show[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
          </ul>
        </div>
        <div>
          <img src={show[0].flag} alt={show[0].name}
          width="200" height="200" />
        </div>
    </div>
  )
}

const ButtonClicked = (props) =>{
  if(props.bool){
    return(
      <Specific show={props.show} />
    )
  }
  return(<></>)
}

const Weather = ({weather}) =>{
  return(
    <>
    <h3>Weather in {weather[0].location.name}</h3>
    <div><strong>Temperature:</strong> {weather[0].current.temperature}</div>
    <img src={weather[0].current.weather_icons[0]} alt={weather[0].location.name} />
    <div><strong>Wind:</strong> {weather[0].current.wind_speed} mph direction {weather[0].current.wind_dir} </div>
    </>
  )
}


const Output = ({show,filteredCountries,handleClick,weather}) =>{
  if(show.length > 0){
    if(filteredCountries.length > 10){
      return(
        <p>be more specific</p>
      )
    }
    else if(filteredCountries.length <= 10 && filteredCountries.length > 1){
      return(
        <div>
        {filteredCountries.map((country,index) => {
          return(
            <div key={country.name}>{country.name}
            <button value={index} onClick={handleClick} type='submit'>View</button>
            </div>
          )})}
        </div>
      )
    }
    else if(filteredCountries.length === 1){
      console.log('one show',show)
      return(
        <>
        <Specific show={show}/>
        <Weather weather={weather} />
        </>
      )
    }
  }
  return(<></>)
}

const App = () => {
  const [countries,setCountries] = useState([])
  const [weather,setWeather] = useState([])
  const [searchCountry,setSearchCountry] = useState('')
  const [show,setShow] = useState([])
  const [bool,setBool] = useState(false)
  const [countryName, setCountryName] = useState('')

  let filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))

  const api_key = process.env.REACT_APP_API_KEY
  let url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`
  console.log('show[0]',show[0])
  const weatherAPI = () =>{
      axios
        .get(url)
        .then(response =>{
          setWeather([response.data])
          console.log('this is weather api', weather)
      })
  }

  useEffect(weatherAPI,[show])

  const effect = () =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
      setCountries(response.data)
      console.log('this is country api ', countries)
    })
  }
  console.log('countries',countries)
  useEffect(effect,[])

  console.log('countries',countries)

  const handleSearch = (event) =>{
    setShow(filteredCountries)
    setSearchCountry(event.target.value)
    setCountryName(filteredCountries[0].name)
    setBool(false)
  }

  const handleClick = (event) =>{
    event.preventDefault()
    setShow([filteredCountries[event.target.value]])
    setBool(true)
    console.log('this is from button', event.target.value, 'xxxx') 
    console.log('this is how', show)
  }

  console.log('weather data',weather)
  return(
    <div>
      <div>
        find countries
        <input value={searchCountry} onChange={handleSearch}/>
      </div>
      <div>
        <Output show={show} filteredCountries={filteredCountries} handleClick={handleClick} weather={weather} />
        <ButtonClicked show={show} bool={bool} />
      </div>
    </div>
  )
}

export default App