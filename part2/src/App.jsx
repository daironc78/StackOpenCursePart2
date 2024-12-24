import { useState, useEffect } from "react";
import CountryService from "./services/CountryService";
import WeatherService from "./services/WeatherService";
import SearchCountry from "./components/search_country/SearchCountry";
import ListCountries from "./components/list_countries/ListCountries";
import ResumeCountry from "./components/resume_country/ResumeCountry";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [filterCountry, setFilterCountry] = useState("");
  const [showCountry, setShowCountry] = useState(false);

  useEffect(() => {
    if (filterCountry !== "") {
      CountryService.getAll()
        .then((response) => {
          setCountries(response);
          showElementCountryFilter();
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [filterCountry]);

  useEffect(() => {
    if (country) {
      const latitud = country.capitalInfo.latlng[0];
      const longitud = country.capitalInfo.latlng[1];

      WeatherService.getWeatherByCity(latitud, longitud)
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.log("Error fetching weather data: ", error);
        });
    }
  }, [country]);

  const countryToShow = (event) => {
    setFilterCountry(event);
  };

  const showElementCountryFilter = () => {
    if (countries !== null) {
      const CountriesFiltered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
      );
      if (CountriesFiltered.length === 1) {
        setCountry(CountriesFiltered[0]);
      }
      setShowCountry(CountriesFiltered.length === 1);
    } else {
      setShowCountry(false);
    }
  };

  const toggleSelectCountry = (name) => {
    if (name !== "") {
      CountryService.getName(name)
        .then((response) => {
          setCountry(response);
          setShowCountry(true);
        })
        .catch((error) => {
          setShowCountry(true);
          console.log("Error: ", error);
        });
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      <SearchCountry searchCountry={countryToShow} />
      <hr />
      {!showCountry ? (
        <ListCountries
          countries={countries}
          filteredCountries={filterCountry}
          toggleSelectCountryOf={toggleSelectCountry}
        />
      ) : (
        <ResumeCountry country={country} weather={weather} />
      )}
    </div>
  );
};

export default App;
