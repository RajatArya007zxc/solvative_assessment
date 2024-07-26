import './style.css';

function ItemsPerPage({ itemsPerPage, onItemsPerPageChange }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue > 0) {
      onItemsPerPageChange(newValue);
    }
  };

  return (
    <div className="items-per-page-select">
      <label htmlFor="itemsPerPage">Items per page:</label>
      <input
        type="number"
        id="itemsPerPage"
        min="1"
        value={itemsPerPage}
        onChange={handleChange}
      />
    </div>
  );
}

export default ItemsPerPage;