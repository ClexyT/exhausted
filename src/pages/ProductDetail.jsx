import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import productsData from '../data/products.json'
import './ProductDetail.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = productsData.find(p => p.slug === slug)
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="pd-notfound">
        <p>Producto no encontrado.</p>
        <Link to="/catalogo">← Volver al catálogo</Link>
      </main>
    )
  }

  const { name, brand, price, status, images, description, sizes, measurements, category } = product

  function handleAdd() {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="pd">
      <Link to="/catalogo" className="pd-back">← Catálogo</Link>

      <div className="pd-layout">
        <div className="pd-gallery">
          {images?.length > 0
            ? images.map((img, i) => (
                <div key={i} className="pd-img-wrap">
                  <img src={img} alt={`${name} ${i + 1}`} />
                </div>
              ))
            : <div className="pd-img-placeholder">
                <span>{category.toUpperCase()}</span>
              </div>
          }
        </div>

        <div className="pd-info">
          <p className="pd-brand">{brand}</p>
          <h1 className="pd-name">{name}</h1>
          <p className="pd-price">${price.toLocaleString('es-MX')} MXN</p>

          <span className={`pd-status ${status}`}>
            {status === 'disponible' ? '● Disponible' : '○ Bajo pedido'}
          </span>

          <p className="pd-description">{description}</p>

          <div className="pd-sizes">
            <p className="pd-label">Talla</p>
            <div className="pd-sizes-grid">
              {sizes.map(s => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {Object.keys(measurements || {}).length > 0 && (
            <div className="pd-measurements">
              <p className="pd-label">Medidas</p>
              <table>
                <tbody>
                  {Object.entries(measurements).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            className={`pd-add-btn ${!selectedSize ? 'disabled' : ''} ${added ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={!selectedSize}
          >
            {added ? 'Agregado ✓' : selectedSize ? 'Agregar al carrito' : 'Selecciona una talla'}
          </button>
        </div>
      </div>
    </main>
  )
}
