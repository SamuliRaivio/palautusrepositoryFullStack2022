import { useEffect, useState } from 'react'
import axios from 'axios'

//filter componentti tulostaa inputin johon käyttäjä voi kirjoittaa hakuehtoja maille
const Filter = ({filterWord, filterCountry}) => {
  return (
    <div>
      find countries <input value={filterWord} onChange={filterCountry} />
    </div>
  )
}

//CountriesToShow tulostaa sen mitä sovellus näyttää
//Ensin haetaan apista maiden tiedot
//Filtteröidään maat käyttäjän antaman syötteen mukaan jos syötteellä löytyy 10 tai vähemmän maita
//Jos maita on enemmän tulostetaan "Too many matches, specify another filter"
//Jos maita on yksi tulostetaan kyseisen maan tiedot, yhden maan tietojen tulostaminen on erillinen componentti
const CountriesToShow = ({filterWord, filterCountry}) => {
  const [countries, setCoutries] = useState([])

  //haetaan countries listaan olioita apin välityksellä Effect hookilla
  const hookCountries =() =>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCoutries(response.data)
      })
  }
  useEffect(hookCountries, [])
  
  //filtteröidään maat sen mukaan mitä käyttäjä kirjoittaa hakukenttään
  const filteredCountires = countries.filter(country => country.name.common.toLowerCase().includes(filterWord.toLowerCase()));
  
  //jos maita on enemmän kuin 10 tulostuu "Too many matches, specify another filter"
  if (Object.keys(filteredCountires).length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } 

  //jos maita on vain 1 tulostuu maan tiedot
  if (Object.keys(filteredCountires).length === 1) {
    return (
      <ShowingOneCountry country={filteredCountires}/>
    )
  }

  //muuten, eli jos maita filtteröidyssä listassa on 10 tai vähemmän, tulostuu lista maita nimillä ja viereen painike jolla maan tiedot voi avata
  //painike oikeastaan lisää vaan maan nimen hakuun ja filtteröi listaan vain tämän maan jolloin tulostetaan palautus edellisen ehtolauseen mukaan
    return (
      <ul>
        {filteredCountires.map((country, i) => 
          <li key={i}>{country.name.common} 
          <Button name={country.name.common.toLowerCase()} filterCountry={filterCountry} />
          </li>
        )}
      </ul>
    )
}

//ShowingOneCountry tulostaa yhden maan tiedot jos maan on filtteröity vain yhdelle maalle
//
const ShowingOneCountry = ({country}) => {

  //countryToShow on maa mitä käsitellään, tehdään siitä selkeyden vuoksi erillinen muuttuja, sillä propsina tuleva country on lista jossa on vain yksi olio
  const countryToShow = country[0]

  //maan tiedoissa kieli- ja säätiedot tulevat erillisiltä componenteilta
  return (
    <div>
      <h1>{countryToShow.name.common}</h1>
      <p>capital {countryToShow.capital}</p>
      <p>area {countryToShow.area}</p>
      <ListLanguages country={countryToShow}/>
      <img src={countryToShow.flags.png} />
      <GetWeatherData capital={countryToShow.capital} />
    </div>
  )
}


//ListLanguages componentti listaa maan viralliset kielet
const ListLanguages = ({country}) => {
  const languages = country.languages

  return (
    <div>
      <h3>languages</h3>
      <ul>
        {Object.keys(languages).map((language, i) => 
          <li key={i}>{languages[language]}</li>
        )}
      </ul>
    </div>
  )
}


//GetWeatherData tulostaa maan säätiedot
//effect hookilla haetaan apin kautta tietyn maan säätiedot (pääkaupungin säätiedot)
//apin kautta saadaan myös sääkuvaiconin id ja sen avulla saadaan tulostettua sääiconikuva
const GetWeatherData = ({capital}) => {
  const api_key = process.env.REACT_APP_NOT_SECRET_CODE
  const [weatherData, setWeatherData] = useState()
  
  const hookWeather =() =>{
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }
  useEffect(hookWeather, [])

  if (!weatherData) { return null }


  const iconLink = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <img src={iconLink} />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )

}

//Button painike maiden filtteröidyn maiden listan vieressä. Filtteröi maan vain kyseisen maan nimen mukaan, eli avaa tämän maan tiedot
const Button = ({name, filterCountry}) => {
  return (
    <button value={name} onClick={filterCountry}>show</button>
  )
}

function App() {
  
  const [filterWord, setFilterWord] = useState('')

  const filterCountry = (event) => {
    setFilterWord(event.target.value);
  }

  return (
    <div>
    <Filter filterWord={filterWord} filterCountry={filterCountry}/>
    <CountriesToShow filterWord={filterWord} filterCountry={filterCountry}/>
    </div>
  );

}

export default App;
