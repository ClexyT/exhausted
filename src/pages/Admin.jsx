import { useState } from 'react'
import productsData from '../data/products.json'
import './Admin.css'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'exhausted2026'

const EMPTY_PRODUCT = {
  name: '',
  brand: '',
  price: '',
  category: 'tenis',
  status: 'bajo-pedido',
  description: '',
  sizes: [],
  featured: false,
}

const TENIS_SIZES = ['4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12']
const CLOTHING_SIZES = ['XS','S','M','L','XL','XXL']

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [products, setProducts] = useState(productsData)
  const [saved, setSaved] = useState(false)

  function login(e) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuth(true)
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 2000)
    }
  }

  function slugify(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  function toggleSize(size) {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter(s => s !== size)
        : [...f.sizes, size],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newProduct = {
      ...form,
      id: Date.now().toString(),
      slug: slugify(form.name),
      price: Number(form.price),
      images: [],
      measurements: {},
      createdAt: new Date().toISOString().split('T')[0],
    }
    const updated = [newProduct, ...products]
    setProducts(updated)
    setForm(EMPTY_PRODUCT)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const sizeOptions = ['tenis'].includes(form.category) ? TENIS_SIZES : CLOTHING_SIZES

  if (!auth) {
    return (
      <main className="admin-login">
        <form onSubmit={login} className="admin-login-form">
          <p className="admin-login-label">EXHAUSTED — ADMIN</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className={`admin-pw-input ${pwError ? 'error' : ''}`}
            autoFocus
          />
          <button type="submit" className="admin-login-btn">Entrar</button>
          {pwError && <p className="admin-error">Contraseña incorrecta</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="admin">
      <div className="admin-header">
        <span>Admin Panel</span>
        <button onClick={() => setAuth(false)} className="admin-logout">Salir</button>
      </div>

      <div className="admin-layout">
        <section className="admin-form-section">
          <h2>Agregar producto</h2>
          <form onSubmit={handleSubmit} className="admin-form">

            <div className="field-group">
              <label>Nombre del producto *</label>
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="ej. Air Jordan 1 Retro High OG" />
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Marca *</label>
                <input required value={form.brand} onChange={e => setForm(f => ({...f, brand: e.target.value}))} placeholder="Nike, Adidas, Exhausted..." />
              </div>
              <div className="field-group">
                <label>Precio (MXN) *</label>
                <input required type="number" min="0" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} placeholder="2500" />
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Categoría</label>
                <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value, sizes: []}))}>
                  <option value="tenis">Tenis</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="camisetas">Camisetas</option>
                  <option value="pantalones">Pantalones</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div className="field-group">
                <label>Estado</label>
                <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
                  <option value="bajo-pedido">Bajo pedido</option>
                  <option value="disponible">Disponible</option>
                </select>
              </div>
            </div>

            <div className="field-group">
              <label>Descripción</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Colorway, condición, detalles del producto..." />
            </div>

            <div className="field-group">
              <label>Tallas disponibles</label>
              <div className="size-picker">
                {sizeOptions.map(s => (
                  <button type="button" key={s} className={`size-pick-btn ${form.sizes.includes(s) ? 'selected' : ''}`} onClick={() => toggleSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group checkbox-group">
              <label>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({...f, featured: e.target.checked}))} />
                Mostrar en destacados (home)
              </label>
            </div>

            <button type="submit" className={`admin-submit ${saved ? 'saved' : ''}`}>
              {saved ? '¡Producto agregado! ✓' : 'Agregar producto'}
            </button>

            {saved && (
              <p className="admin-note">
                El producto se agregó en memoria. Para guardarlo permanentemente edita <code>src/data/products.json</code> con los datos mostrados abajo y haz git push.
              </p>
            )}
          </form>
        </section>

        <section className="admin-list-section">
          <h2>Productos ({products.length})</h2>
          <ul className="admin-product-list">
            {products.map(p => (
              <li key={p.id} className="admin-product-item">
                <div>
                  <p className="apl-name">{p.name}</p>
                  <p className="apl-meta">{p.category} · ${p.price.toLocaleString('es-MX')} · {p.status}</p>
                </div>
                <span className={`apl-badge ${p.status}`}>
                  {p.status === 'disponible' ? '●' : '○'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
