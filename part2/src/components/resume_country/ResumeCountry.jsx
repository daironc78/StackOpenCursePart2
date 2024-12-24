const ResumeCountry = ({ country, weather }) => {
  const Weather = () => {
    if (weather) {
      return (
        <>
          <tr>
            <td colSpan="2" className="weather">
              <img className="weather-icon"
                src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                alt={weather.current.weather[0].description}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Temperature:</strong>
            </td>
            <td>{(weather.current.temp - 273.15).toFixed(2)} °C</td>
          </tr>
          <tr>
            <td>
              <strong>Wind:</strong>
            </td>
            <td>{weather.current.wind_speed} m/s</td>
          </tr>
        </>
      );
    }
  };
  return (
    <div>
      <h2>{country.name.common}</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Capital:</strong>
            </td>
            <td>{country.capital[0]}</td>
          </tr>
          <tr>
            <td>
              <strong>Area:</strong>
            </td>
            <td>{country.area}</td>
          </tr>
          <tr>
            <td>
              <strong>Languages:</strong>
            </td>
            <td>
              <ul className="languages">
                {Object.values(country.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <img src={country.flags.png} alt={country.name.common} />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="weather">
              <h2>Weather in {country.capital[0]}</h2>
            </td>
          </tr>
          <Weather />
        </tbody>
      </table>
    </div>
  );
};

export default ResumeCountry;
