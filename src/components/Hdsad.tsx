import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { articlesData } from '../store/articlesSelectors';
import { fetchArticles } from '../store/articles/articlesActions'

const Hdsad = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [categoryFilter, setCategoryFilter] = useState('');

  const dispatch = useDispatch();
  const dsds = useSelector(articlesData)
  console.log(dsds);


  const handleSearch = () => {
    const requestParam = `q=${searchQuery}&sortBy=${sortBy || 'publishedAt'}category=${categoryFilter || 'all categories'}`
    dispatch(fetchArticles(requestParam));
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news..."
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="publishedAt">Published At</option>
        <option value="relevancy">Relevancy</option>
        <option value="popularity">Popularity</option>
      </select>
      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="general">General</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      {/* {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {news.map((article) => (
          <li key={article.url}>
            <a href={article.url}>{article.title}</a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Hdsad;
