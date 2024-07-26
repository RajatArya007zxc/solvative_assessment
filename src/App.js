import  { useState, useEffect, useCallback } from 'react';
import SearchBox from './components/Search';
import Table from './components/Table';
import Pagination from './components/Pagination';
import LimitInput from './components/LimitInput';
import ItemPerPage from "./components/ItemPerPage";
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);

  const fetchCities = useCallback(async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?namePrefix=${searchTerm}&limit=${limit}`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();
      setCities(data.data);
      setTotalItems(data.data.length);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    setLoading(false);
  }, [searchTerm, limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCities();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchCities]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

// bonus
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="app">
      <SearchBox onSearch={handleSearch} />
       <Table
        cities={cities}
        loading={loading}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      
      <div className="bottom-controls">
       {
       cities?.length>0
          ? 
          <>
           <div className='pagination-controls'> 
           <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <ItemPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
           </div>
        <LimitInput onLimitChange={handleLimitChange} />
          </> 
          :""
       }
      </div> 
    </div>
  );
}

export default App;