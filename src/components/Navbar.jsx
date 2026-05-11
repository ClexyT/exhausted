import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { count, setIsOpen } = useCart()
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        EXHAUSTED
      </Link>
      <div className="navbar-links">
        <Link to="/catalogo">Catálogo</Link>
      </div>
      <button className="navbar-cart" onClick={() => setIsOpen(true)}>
        <span>Carrito</span>
        {count > 0 && <span className="cart-badge">{count}</span>}
      </button>
    </nav>
  )
}
