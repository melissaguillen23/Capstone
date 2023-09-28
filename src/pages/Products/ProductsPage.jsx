import React, { useEffect, useState } from "react"
import { api } from "../../API/CS_API" 
import ProductFilters from "../../components/Product/ProductFilters";
import ProductList from "../../components/Product/ProductList"
import SearchBar from "../../components/Product/SearchBar"

export default function ProductPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sort, setSort] = useState('name');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        api.allProducts()
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
        api.getAllCategories()
            .then(data => {
                setCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error)
            });
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
            <SearchBar onSearch={handleSearch} />
            <ProductFilters
                sort={sort} 
                setSort={setSort} 
                filter={filter} 
                setFilter={setFilter} 
                categories={categories} 
            />
            <div className="products" >
            <ProductList products={filteredProducts} />
            </div>
        </div>
    );
}