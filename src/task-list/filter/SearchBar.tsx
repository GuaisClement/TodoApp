import { useState, ChangeEvent  } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setWordEntered(event.target.value);
    // Additional logic for filtering can be added here if needed
  };

  const clearInput = () => {
    setWordEntered('');
  };

  return (
    <div className="searchInputs">
      <input
        type="text"
        placeholder="Research..."
        value={wordEntered}
        onChange={handleFilter}
        // ref={inputRef}
      />
      <div className="searchIcon">
        <FaSearch onClick={clearInput} />
      </div>
    </div>
  );
};

export default SearchBar;
