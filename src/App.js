import {  FormControl,Select, MenuItem , Card, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './App.css';
import Infobox from './Infobox';
import Map from  './Map';

function App() {
  const [countries , setCountries] = useState(['']);
  const [country , setCountry] = useState("")
  const [countryInfo , setCountryInfo ] = useState({});

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response =>response.json())
    .then((data) => {
      setCountryInfo(data);
    })

  } , [])

  useEffect (()=>{
    const getCountriesData = async () => {
     await  fetch('https://disease.sh/v3/covid-19/countries')
     .then((response)=>response.json())
     .then((data)=>{

      const countries = data.map ((country) => ({
        name:country.country,
        value:country.countryInfo.iso2,

      }))
    
      setCountries(countries);
    })
    }
    
    getCountriesData();

  } , [])

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;

    console.log("event fired ....." ,countryCode);
    
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=> response.json())
    .then(data => {

 
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };

  console.log("country info " , countryInfo);

 

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
    <h1>covid19-tracker</h1>
    <FormControl className="app__dropdown">
      <Select variant="outlined" 
      onChange={onCountryChange} value={country}>
      
      <MenuItem value="worlwide">Worldwide</MenuItem>
   {countries.map((country) =>(
         <MenuItem value={country.value}>{country.name}</MenuItem>
   ))}

      </Select>


    </FormControl>
    
    </div>
    

    <div className="app__stats">
    <Infobox title="coronavirus Cases"  cases={countryInfo.todayCases} total={countryInfo.cases} / >
      <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
      <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths } />

    </div>
    
    <Map />
 

      </div>
    
    <Card className="app__right">
      <CardContent>

<h1>list of country by cases</h1>
       {/*table */}
    <h1>total new cases</h1>
    {/*graph*/}

      </CardContent>
      
      
    
    </Card>
       </div>
  );
}

export default App;
