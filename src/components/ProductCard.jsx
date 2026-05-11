import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { slug, name, brand, price, status, images, category } = product

  return (
    <Link to={`/producto/${slug}`} className="product-card">
      <div className="product-card-img">
        {images?.[0]
          ? <img src={images[0]} alt={name} />
          : <div className="product-card-placeholder">
              <span>{category.toUpperCase()}</span>
            </div>
        }
        <span className={`product-badge ${status}`}>
          {status === 'disponible' ? 'Disponible' : 'Bajo pedido'}
        </span>
      </div>
      <div className="product-card-info">
        <p className="product-card-brand">{brand}</p>
        <p className="product-card-name">{name}</p>
        <p className="product-card-price">${price.toLocaleString('es-MX')} MXN</p>
      </div>
    </Link>
  )
}
