import React, { useEffect, useState } from 'react'
import { api } from '../../API/CS_API'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductDetails() {
    const [product, setProduct] = useState(null)
    const { productId } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await api.singleProduct(productId);
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product details:", error.message);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className='product-details'>
            <div className='back-button' >
            <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div product-details-info >
            <h2>{product.title}</h2>
            <br />
            <b>${product.price} </b>
            <br />
            <p>{product.description} </p>
            <br />
            <p>Rating: {product.rating.rate} ({product.rating.count} ratings)</p>
            </div>
            <div className='product-details-img' >
            <img src={product.image} alt={product.title} />
            </div>
            <div className="add-to-cart-button" >
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
        </div>
    )
  }