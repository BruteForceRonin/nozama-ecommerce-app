import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
  });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.payment) newErrors.payment = "Please select a payment method";

    if (form.payment === "card") {
      if (!form.cardNumber || !/^\d{16}$/.test(form.cardNumber))
        newErrors.cardNumber = "Enter a valid 16-digit card number";
      if (!form.cardName?.trim())
        newErrors.cardName = "Cardholder name is required";
      if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry))
        newErrors.expiry = "Enter expiry as MM/YY";
      if (!form.cvv || !/^\d{3}$/.test(form.cvv))
        newErrors.cvv = "Enter a valid 3-digit CVV";
    }

    if (form.payment === "upi") {
      if (!form.upiId || !/^\S+@\S+$/.test(form.upiId))
        newErrors.upiId = "Enter a valid UPI ID";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const savedTotal = total;
      setFinalTotal(savedTotal);
      clearCart();
      setOrdered(true);
      setShowModal(false);
    }
  };

  if (cart.length === 0 && !ordered) {
    return (
      <div className="container-fluid py-5" style={{ backgroundColor: 'var(--light-beige)', minHeight: 'calc(100vh - 70px)' }}>
        <div className="container">
          <div className="text-center">
            <h3 className="fw-bold">Your cart is empty!</h3>
            <button 
              className="btn mt-3 fw-semibold"
              style={{ backgroundColor: 'var(--button-color)', color: 'white' }}
              onClick={() => navigate("/")}
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (ordered) {
    return (
      <div className="container-fluid py-5" style={{ backgroundColor: 'var(--light-beige)', minHeight: 'calc(100vh - 70px)' }}>
        <div className="container">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Order Placed! 🎉</h4>
            <p>Thank you <strong>{form.name}</strong>, your order of <strong>${finalTotal.toFixed(2)}</strong> has been placed!</p>
          </div>
          <button 
            className="btn fw-semibold"
            style={{ backgroundColor: 'var(--button-color)', color: 'white' }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: 'var(--light-beige)', minHeight: 'calc(100vh - 70px)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h3 className="fw-bold mb-4">Order Summary</h3>
            <ul className="list-group mb-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.title} <span className="text-muted">x{item.quantity}</span>
                </span>
                <span className="fw-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold" style={{ backgroundColor: 'var(--light-beige)' }}>
              <span>Total</span>
              <span style={{ color: 'var(--navy-blue)', fontSize: '1.2rem' }}>${total.toFixed(2)}</span>
            </li>
          </ul>

          <button 
            className="btn w-100 fw-semibold py-2"
            style={{ backgroundColor: 'var(--button-color)', color: 'white' }}
            onClick={() => setShowModal(true)}
          >
            Place Order
          </button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-danger small mt-1">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-danger small mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control"
              placeholder="1234567890"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && (
              <p className="text-danger small mt-1">{errors.phone}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Delivery Address</label>
            <input
              className="form-control"
              placeholder="123 Main St, City"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {errors.address && (
              <p className="text-danger small mt-1">{errors.address}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Payment Method</label>
            <select
              className="form-select"
              value={form.payment}
              onChange={(e) => setForm({ ...form, payment: e.target.value })}
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
            </select>
            {errors.payment && (
              <p className="text-danger small mt-1">{errors.payment}</p>
            )}
          </div>

          {form.payment === "card" && (
            <div>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  className="form-control"
                  placeholder="1234567890123456"
                  value={form.cardNumber || ""}
                  onChange={(e) =>
                    setForm({ ...form, cardNumber: e.target.value })
                  }
                />
                {errors.cardNumber && (
                  <p className="text-danger small mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Cardholder Name</label>
                <input
                  className="form-control"
                  placeholder="John Doe"
                  value={form.cardName || ""}
                  onChange={(e) =>
                    setForm({ ...form, cardName: e.target.value })
                  }
                />
                {errors.cardName && (
                  <p className="text-danger small mt-1">{errors.cardName}</p>
                )}
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Expiry (MM/YY)</label>
                  <input
                    className="form-control"
                    placeholder="12/25"
                    value={form.expiry || ""}
                    onChange={(e) =>
                      setForm({ ...form, expiry: e.target.value })
                    }
                  />
                  {errors.expiry && (
                    <p className="text-danger small mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input
                    className="form-control"
                    placeholder="123"
                    value={form.cvv || ""}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                  />
                  {errors.cvv && (
                    <p className="text-danger small mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {form.payment === "upi" && (
            <div className="mb-3">
              <label className="form-label">UPI ID</label>
              <input
                className="form-control"
                placeholder="name@upi"
                value={form.upiId || ""}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
              />
              {errors.upiId && (
                <p className="text-danger small mt-1">{errors.upiId}</p>
              )}
            </div>
          )}

          <div className="d-flex gap-2 justify-content-end mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button 
              className="btn fw-semibold"
              style={{ backgroundColor: 'var(--button-color)', color: 'white' }}
              onClick={handleSubmit}
            >
              Confirm Order
            </button>
          </div>
        </Modal>
      )}
      </div>
    </div>
  );
}

export default Checkout;
