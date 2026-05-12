import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'
import './Home.css'

const featured = productsData.filter(p => p.featured)

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Streetwear & Sneakers</p>
          <h1 className="hero-title">EXHAUSTED</h1>
          <p className="hero-sub neonText">Hype & StreetWear</p>
          <Link to="/catalogo" className="hero-cta">Ver catálogo</Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="home-featured">
          <div className="section-header">
            <h2>Destacados</h2>
            <Link to="/catalogo">Ver todo →</Link>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <section className="home-info">
        <div className="info-block">
          <h3>Bajo pedido</h3>
          <p>La mayoría de los productos son en reventa. Una vez que confirmes tu pedido por WhatsApp coordinamos pago y entrega.</p>
        </div>
        <div className="info-block">
          <h3>CDMX</h3>
          <p>Basados en la Ciudad de México. Envíos a toda la república y entrega local disponible.</p>
        </div>
        <div className="info-block">
          <h3>100% auténtico</h3>
          <p>Solo producto auténtico. Incluimos comprobante y fotos reales antes de enviar.</p>
        </div>
      </section>
    </main>
  )
}
