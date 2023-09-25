import React, { useEffect, useState } from "react"
import { api } from "../API/CS_API"
import '../style/styles.css'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await api.fetchAllProducts()
      setProducts(products)
    }
    fetchAllProducts()
  }, [])

    return (
      <div>
        <h1>Products Page</h1>
        <div className="products-grid" >
          {products && products.length > 0 && products.map(product => (
            <div key={product.id} className="product-card" >
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Rating: {product.rating.rate} ({product.rating.count} ratings)</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }