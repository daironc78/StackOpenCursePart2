const SearchContact = ({ searchContact }) => {
  return (
    <div>
      <input
        placeholder="Search contact"
        onChange={(event) => {
          searchContact(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchContact;
