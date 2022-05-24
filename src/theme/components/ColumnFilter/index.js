import React from 'react'
import './filter.css';

function ColumnFilter({column}) {
  const {filterValue, setFilter} = column
  return (
    <span>
      <input 
      className="filter-input" 
      value={filterValue || ''} 
      maxLength={10}
      onChange={(e) => setFilter(e.target.value)} 
      />
    </span>
  )
}

export default ColumnFilter;