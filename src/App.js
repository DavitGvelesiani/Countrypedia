import React from 'react';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ListOfCountries from './components/ListOfCountries';
import Card from './components/UI/Card';
import classes from './App.module.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        'https://restcountries.com/v2/all?fields=name,region,area'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      
      const loadedCountries = [];
      const responseData = await response.json();

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

    fetchCountries().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.error}>
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
  

  function ascSortHandler(){
    const ascSortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
    setCountries(ascSortedCountries);
  }

  function descSortHandler(){
    const descSortedCountries = [...countries].sort((a, b) => b.name.localeCompare(a.name));
    setCountries(descSortedCountries);
  }

  function filterHandler(){
    const filteredCountries = countries.filter(country =>
      country.area < 65300 && 
      country.region === 'Oceania'
    );
    setCountries(filteredCountries);       
  }
    
  
  return (
    <React.Fragment>
      <Layout 
        onAscSorting={ascSortHandler}
        onDescSorting={descSortHandler}
        onFilter={filterHandler}
      >
        <Card className={classes.countries}>
          <ul>
            {countriesList}
          </ul>
        </Card>
      </Layout>      
    </React.Fragment>
  );
}

export default App;
