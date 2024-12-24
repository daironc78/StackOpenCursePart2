const SearchCountry = ({ searchCountry }) => {
  return (
    <div>
      Find countries:
      <input
        placeholder="Search country"
        onChange={(event) => {
          searchCountry(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchCountry;
