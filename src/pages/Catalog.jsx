import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import './Catalog.css'

const CATEGORIES = [
  { value: 'all', label: 'Todo' },
  { value: 'tenis', label: 'Tenis' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 'camisetas', label: 'Camisetas' },
  { value: 'pantalones', label: 'Pantalones' },
  { value: 'accesorios', label: 'Accesorios' },
]

export default function Catalog() {
  const [category, setCategory] = useState('all')
  const { products, search, setSearch } = useProducts(category)

  return (
    <main className="catalog">
      <div className="catalog-header">
        <h1>Catálogo</h1>
        <input
          className="catalog-search"
          type="text"
          placeholder="Buscar producto o marca..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="catalog-filters">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            className={`filter-btn ${category === c.value ? 'active' : ''}`}
            onClick={() => setCategory(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="catalog-empty">
          <p>Sin resultados.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </main>
  )
}
