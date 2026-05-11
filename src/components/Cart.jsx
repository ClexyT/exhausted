import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items, removeItem, total, isOpen, setIsOpen, sendToWhatsApp, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <aside className="cart-drawer">
        <div className="cart-header">
          <span className="cart-title">Tu pedido</span>
          <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Nada aquí todavía.</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map(item => (
                <li key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item-img">
                    {item.images?.[0]
                      ? <img src={item.images[0]} alt={item.name} />
                      : <div className="cart-item-placeholder" />}
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-meta">Talla {item.size} · x{item.qty}</p>
                    <p className="cart-item-price">${(item.price * item.qty).toLocaleString('es-MX')}</p>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(item.id, item.size)}>✕</button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toLocaleString('es-MX')} MXN</span>
              </div>
              <button className="cart-whatsapp" onClick={sendToWhatsApp}>
                Enviar por WhatsApp
              </button>
              <button className="cart-clear" onClick={clearCart}>Vaciar carrito</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
