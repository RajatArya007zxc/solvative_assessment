import './style.css';

function Table({ cities, loading, currentPage, itemsPerPage }) {
  if (loading) {
    return <div className="spinner"><img src="/spinner.svg" alt="Loading..."/></div>;
  }

  if (cities.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCities = cities.slice(startIndex, endIndex);

  return (
    <table className="cities-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {displayedCities.map((city, index) => (
          <tr key={city.id}>
            <td>{startIndex + index + 1}</td>
            <td>{city.name}</td>
            <td>
              <div className='flag-container'>
              <img
                src={`https://flagsapi.com/${city.countryCode}/flat/24.png`}
                alt={`${city.countryCode} flag`}
              />
              {city.country}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;