import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchProductDetails } from "../API"
import "../main.css"


export default function SingleProduct() {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [productDetails, setProductDetails] = useState(null)
    const [cart, setCart] = useState([])

    async function fetchAndSetProductDetails() {
        try {
            const response = await fetchProductDetails(productId)
            console.log("Product details: ", response)
            setProductDetails(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAndSetProductDetails()
    }, [productId])

    const addToCart = () => {
        setCart([...cart, productDetails])
    }

    return (
        <div>
            <div className="product-details-header">
                <h1 className="product-details-title">Product Details</h1>
                <button className="back-button" onClick={() => navigate("/products")}>Go Back</button>
            </div>
            <div className="single-product-container">
                {productDetails ? (
                    <div className="product-details">
                        <img className="single-product-image" src={productDetails.image} alt={productDetails.title} />
                            <div className="product-info">
                                <p className="single-product-title">{productDetails.title}</p>
                                <p className="single-product-price">Price: ${productDetails.price}</p>
                                <p className="single-product-description">Description: {productDetails.description}</p>
                                <p className="single-product-rating">Rating: {productDetails.rating.rate} ({productDetails.rating.count} ratings)</p>
                                <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
                            </div>
                    </div>
                ) : (
                <p>Loading product details...</p>
                )}
            </div>
        </div>
    )
  }