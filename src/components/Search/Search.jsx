const Search = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="search"
        name=""
        id="search"
        placeholder="Search"
        onInput={(event) => {
          setSearch(event.target.value.toLowerCase());
        }}
        value={search}
      />
    </div>
  );
};

export default Search;
