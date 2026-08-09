function Cart({ cart , removeFromCart}) { 
    
    const totalPrice = cart.reduce((sum,item)=> sum + item.price * item.quantity,0)
    // receive cart as prop
  if (cart.length === 0) {
    return <p>Your cart is empty</p>
  }

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          <h5>{item.title}</h5>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
      ))}
    </div>
  )
}

export default Cart