import React, { useEffect, useState } from 'react'
import { api } from '../API/CS_API'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
    const [product, setProduct] = useState(null)
    const { productId } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            const productData = await api.fetchProduct(productId)
            setProduct(productData)
        }
        fetchProducts()
    }, [productId])

    return (
        <div className='product-detail-container' >
            <h1>Product Details Page</h1>
            {product && (
                <div className='product-detail-card' >
                    <h2>{product.title}</h2>
                    <p>Price: ${product.price} </p>
                    <p>{product.category} </p>
                    <p>{product.description} </p>
                    <img src={product.image} alt={product.title} />
                </div>
            )}
        </div>
    )
  }