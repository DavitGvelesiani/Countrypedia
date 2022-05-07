import React from 'react';
import { useState, useEffect } from 'react';
import ListOfCountries from './components/ListOfCountries';
import classes from './App.module.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://restcountries.com/v2/all?fields=name,region,area.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedCountries = [];

      for (const key in responseData) {
        loadedCountries.push({
          id: key,
          name: responseData[key].name,
          region: responseData[key].region,
          area: responseData[key].area,
        });
      }

      setCountries(loadedCountries);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  const countriesList = countries.map((country) => {
    return (
      <ListOfCountries 
        key={country.id}
        name={country.name}
        region={country.region}
        area={country.area}
      />
    );
  });

  function ascSortHandler(event){
    event.preventDefault();
    const ascSortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));
    setCountries(ascSortedCountries);
    console.log(countries);
  }

  function descSortHandler(event){
    event.preventDefault();
    const descSortedCountries = countries.sort((a, b) => b.name.localeCompare(a.name));
    setCountries(descSortedCountries);
    console.log(countries);
  }

  function filterHandler(event){
    event.preventDefault();
    const filteredCountries = countries.filter(country =>
      country.area < 65300 && 
      country.region === 'Oceania'
    );
    setCountries(filteredCountries);
    console.log(countries);
  }
    


  return (
    <React.Fragment>
      <h1 className={classes.header}>Countrypedia</h1>
      <button onClick={ascSortHandler}>sort (ascending)</button>
      <button onClick={descSortHandler}>sort (descending)</button>
      <button onClick={filterHandler}>Filter</button>
      <ul>
        {countriesList}
      </ul>
      
    </React.Fragment>
  );
}

export default App;
