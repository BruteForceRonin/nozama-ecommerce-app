function Modal({ onClose, children }) {
  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" style={{ background: 'var(--navy-gradient)', borderBottom: 'none' }}>
            <h5 className="modal-title text-white fw-bold">Checkout</h5>
            <button 
              className="btn-close btn-close-white" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal