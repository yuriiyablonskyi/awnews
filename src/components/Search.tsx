import { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = () => {
    // Здесь можно добавить логику для выполнения поиска
    console.log('Выполняем поиск с термином:', searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      dispatch(fetchNews())
    }
  };

  useEffect(() => {
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default Search