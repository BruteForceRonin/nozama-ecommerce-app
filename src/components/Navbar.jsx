import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

function Navbar() {
  const { cart, removeFromCart, total } = useCart()
  const navigate = useNavigate()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="navbar navbar-dark navbar-expand-lg" style={{ background: 'var(--navy-gradient)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">nozama</a>

        <div className="dropdown">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Cart <span className="badge bg-light text-dark ms-1">{itemCount}</span>
          </button>

          <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: "320px" }}>
            {cart.length === 0 ? (
              <p className="mb-0 text-muted">Your cart is empty</p>
            ) : (
              <>
                <ul className="list-group list-group-flush mb-2">
                  {cart.map((item) => (
                    <li key={item.id} className="list-group-item px-0 d-flex justify-content-between align-items-start">
                      <div className="me-2">
                        <p className="mb-1 fw-semibold">{item.title}</p>
                        <small className="text-muted">${item.price} x {item.quantity}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mb-0 fw-bold text-end">Total: ${total.toFixed(2)}</p>
                <button
                  className="btn w-100 mt-2 text-white fw-semibold"
                  style={{ backgroundColor: 'var(--button-color)' }}
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar