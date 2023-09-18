export default function Cart({ cartItems }) {

    return (
      <div>
        <h1>Shopping Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - Price: ${item.price}
            </li>
          ))}
        </ul>
      </div>
    )
  }