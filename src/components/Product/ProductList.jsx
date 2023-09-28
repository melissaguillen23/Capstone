import React from "react"
import ProductItem from "./ProductItem";

export default function ProductList({ products }) {

  return (
      <div className="products">
          <ul>
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
      </div>
  );
}