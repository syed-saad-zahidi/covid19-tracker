import {  FormControl,Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './App.css';
import Infobox from './Infobox';

function App() {
  const [countries , setCountries] = useState(['']);
  const [country , setCountry] = useState("")

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

  const onCountryChange = (event) =>{
    const countryCode = event.target.value;

    console.log("event fired ....." ,countryCode);
    
    setCountry(countryCode);

  };
 

  return (
    <div className="App">
    
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
    <Infobox title="coronavirus Cases"  cases={123} total={2000} / >
      <Infobox title="Recovered" cases={1234} total={3000} />
      <Infobox title="Deaths" cases={1235} total={4000} />

    </div>
    {/*table */}
    {/*graph*/}

    {/*map */}
    </div>
  );
}

export default App;
