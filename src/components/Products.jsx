import { useEffect, useState } from "react"
import { FetchAllProducts } from "../API"
import "../main.css"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

export default function Products() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const navigate = useNavigate()

    const navigateToSingleProduct = (productId) => {
        navigate(`/single-product/${productId}`)
    }

    async function FetchProducts() {
        try {
            const response = await FetchAllProducts()
            setProducts(response)
            setFilteredProducts(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        FetchProducts();
    }, [])

    const handleSearch = (searchText) => {
        const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredProducts(filtered)
    }

    return (
      <div>
        <div className="product-header">
            <h1 className="product-page-title">Shop Our Products!</h1>
            <div>
            <SearchBar onSearch={handleSearch} />
            </div>
        </div>
        <div className="product-container">
            {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                    <h2 className="product-title">{product.title}</h2>
                    <img className="product-image" src={product.image} alt={`Image of ${product.name}`} />
                    <p className="product-rating">Rating: {product.rating.rate} ({product.rating.count} ratings)</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <button onClick={() => navigateToSingleProduct(product.id)}>Product Details</button>
                </div>
            ))}
        </div>
      </div>
    )
  }