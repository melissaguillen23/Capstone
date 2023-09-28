import React from 'react'

export default function ProductFilters({ sort, setSort, filter, setFilter, categories }) {

    return (
      <div className='sorting-filtering-container'>
        <div className='sort-filters' >
            <label htmlFor="sortPrice">Sort by price: </label>
            <select name="sortPrice" id="sortPrice" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Select</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
        </div>
        <div className='category-filters'>
            <button onClick={() => setFilter('')}>All</button>                
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => {
                        console.log("Category clicked:", category);
                        setFilter(category);
                    }}
                    className={filter === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
        </div>
      </div>
    );
  }