import React, { useEffect, useState } from "react"
import { api } from "../../API/CS_API" 
import ProductFilters from "../../components/Product/ProductFilters";
import ProductList from "../../components/Product/ProductList"
import SearchBar from "../../components/Product/SearchBar"

export default function ProductPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sort, setSort] = useState('name');
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

      useEffect(() => { 
        setIsLoading(true);
    
        Promise.all([
            api.allProducts(),
            api.getAllCategories()
        ])
        .then(([productsData, categoriesData]) => {
            setProducts(productsData);
            setFilteredProducts(productsData);
            setCategories(categoriesData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
        .finally(() => setIsLoading(false));
    
    }, []);
    
    const handleSearch = (searchText) => {
        const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredProducts(filtered)
    }

    useEffect(() => {
    let sortedAndFilteredProducts = [...products];
    
       
        if (sort === 'asc') {
          sortedAndFilteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
          sortedAndFilteredProducts.sort((a, b) => b.price - a.price);
        }
    
        if (filter && filter !== 'all') {
          sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.category === filter);
        }
    
        setFilteredProducts(sortedAndFilteredProducts);
      }, [sort, filter, products]);
    
    return (
        <div className='store'>
            <div className="store-header" >
            <h1>Discover our products</h1>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <SearchBar onSearch={handleSearch} />
                    <ProductFilters
                        sort={sort} 
                        setSort={setSort} 
                        filter={filter} 
                        setFilter={setFilter} 
                        categories={categories}
                    />
                    <div className="products" >
                        {filteredProducts.length === 0 ? (
                            <p>No products found</p> 
                        ) : (
                            <ProductList products={filteredProducts} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}