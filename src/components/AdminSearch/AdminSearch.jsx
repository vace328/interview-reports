import "./AdminSearch.css";

const AdminSearch = ({ search, setSearch }) => {
  return (
    <div className="admin-search">
      <input
        type="search"
        name=""
        id="search"
        placeholder="Search by company/candidate"
        onInput={(event) => {
          setSearch(event.target.value.toLowerCase());
        }}
        value={search}
      />
    </div>
  );
};

export default AdminSearch;
