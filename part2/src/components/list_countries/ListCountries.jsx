import Notification from "../notifications/Notification";

const ListCountries = ({
  countries,
  filteredCountries,
  toggleSelectCountryOf,
}) => {
  if (!countries || filteredCountries == "")
    return <Notification message="Specify filter" />;

  const countCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filteredCountries.toLowerCase())
  ).length;

  if (countCountries > 10) {
    return <Notification message="Too many matches, specify another filter" />;
  } else if (countCountries < 1) {
    return <Notification message="No matches" />;
  }

  return (
    <div className="list-countries">
      <h1>List of Countries</h1>
      <table>
        <thead>
          <tr>
            <th>Country Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {countries
            .filter((country) =>
              country.name.common
                .toLowerCase()
                .includes(filteredCountries.toLowerCase())
            )
            .map((country) => (
              <tr key={country.name.common}>
                <td>{country.name.common}</td>
                <td>
                  <button
                    onClick={() => toggleSelectCountryOf(country.name.common)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCountries;
