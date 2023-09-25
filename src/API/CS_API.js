const BASE_URL = 'https://fakestoreapi.com';

class CS_API {
    async _get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin'
        });
        if (!response.ok) {
            throw new Error('Network response error.')
        }
        return response.json()
    }
    
    async fetchAllProducts() {
        return this._get('/products')
    }

    async fetchProduct(productId) {
        return this._get(`/products/${productId}`)
    }
}

export const api = new CS_API();
