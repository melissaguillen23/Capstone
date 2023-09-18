const API_URL = 'https://fakestoreapi.com/products';

export async function FetchAllProducts() {
    try {
        const response = await fetch(`${API_URL}`)
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
}

export async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`)
        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

