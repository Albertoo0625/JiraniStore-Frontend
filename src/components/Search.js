import { useState } from 'react';
import './search.css'
function SearchForm(props) {
  const [query, setQuery] = useState('');
  const {search}=props
  

  const handleSearch = (event) => {
    event.preventDefault();
    // Do something with the search query
    console.log(query);
    search(query)
    
    
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" ><i className="fa fa-search"></i></button>
      </div>
    </form>
  );
}


export default SearchForm;
