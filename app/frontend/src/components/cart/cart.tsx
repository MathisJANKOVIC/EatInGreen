import React from 'react'

 interface CartItem {
    productId: string;
    quantity: number;
  }
    
  interface CartProps {
    items: CartItem[]
  }
  
const Cart: React.FC<CartProps> = ({ items }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {items.length === 0 ? (
          <li>Your cart is empty</li>
        ) : (
          items.map((item) => (
            <li key={item.productId}>
              <strong>Product ID:</strong> {item.productId} <br />
              <strong>Quantity:</strong> {item.quantity} <br />
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
    
export { Cart };export type { CartItem }

