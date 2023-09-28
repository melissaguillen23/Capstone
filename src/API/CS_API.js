const BASE_URL = 'https://fakestoreapi.com';

class CS_API {
    constructor(BASE_URL) {
        this.BASE_URL = BASE_URL;
    }

    async _fetch(endpoint, method = 'GET', data = null) {
        const headers = {
                "Content-Type": "application/json",
            };

            const options = {
                method,
                headers,
            };

            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(`${this.BASE_URL}${endpoint}`, options);

            if (response.headers.get('Content-Type').includes('application/json')) {
               const result = await response.json(); 
               if (!response.ok) {
                throw new Error(result.message || `API call failed: ${response.statusText}`);
            }
            return result;
        } else {
            throw new Error(`API call failed with non-JSON response: ${response.statusText}`);
        }   
    }

    async allProducts(options = {}) { // used in ProductList.jsx
        let endpoint = "/products";
        const params = new URLSearchParams(options).toString();
        if (params) {
            endpoint += `?${params}`;
        }
        return await this._fetch(endpoint);
    }

    async singleProduct(productId) { // used in ProductDetailsjsx
        return await this._fetch(`/products/${productId}`);
    }

    async getProductsByCategory(category) { // used in ProductList.jsx
        return await this._fetch(`/products/category/${category}`);
    }

    async getAllCategories() { // used in ProductList.jsx
        return await this._fetch('/products/categories');
    }

    async getProductsSorted(sortBy) { // used in ProductList.jsx
        return await this._fetch(`/products?sort=${sortBy}`);
    }

    async getLimitedProducts(limit, offset = 0) { //  used in ProductList.jsx
        return await this._fetch(`/products?limit=${limit}&offset=${offset}`);
    }

    async getCart(cartId) { // used in CartContext.jsx
        return await this._fetch(`/carts/${cartId}`);
    }

    async createCart(userId) { 
        const data = {
            userId: userId,
            date: new Date(),
            products: []
        }
        return await this._fetch(`/carts`, 'POST', data);
    }

    async addProductToCart(cartId, productId, quantity = 1) { // used in CartContext.jsx
        const data = {
            productId: productId,
            quantity: quantity
        };
        return await this._fetch(`/carts/${cartId}`, 'POST', data);         
    }

    async removeProductFromCart(cartId, productId) { // used in CartContext.jsx
        return await this._fetch(`/carts/${cartId}/products/${productId}`, 'DELETE');
    }

    async allUsers() { // Fetch All Users 
        return await this._fetch(`/users`);
    } 

    async registerUser(username, email, password) { 
        const data = {
            username: username,
            email: email,
            password: password
        };
        return await this._fetch(`/users`, 'POST', data);
    }

    async loginUser(username, password) {
        const data = {
            username: username,
            password: password
        };
        return await this._fetch(`/auth/login`, 'POST', data);
    }
}

export const api = new CS_API(BASE_URL);
