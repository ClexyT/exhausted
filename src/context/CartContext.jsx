import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('exhausted-cart')) || []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('exhausted-cart', JSON.stringify(items))
  }, [items])

  function addItem(product, size) {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size)
      if (exists) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...product, size, qty: 1 }]
    })
    setIsOpen(true)
  }

  function removeItem(id, size) {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  function sendToWhatsApp() {
    const phone = '525560730358'
    const lines = items.map(
      i => `• ${i.name} | Talla: ${i.size} | Qty: ${i.qty} | $${(i.price * i.qty).toLocaleString('es-MX')}`
    )
    const text = [
      '🛒 *Pedido Exhausted Store*',
      '',
      ...lines,
      '',
      `*Total: $${total.toLocaleString('es-MX')} MXN*`,
      '',
      '(Envíame este mensaje para coordinar el pago y envío ♱)',
    ].join('\n')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count, isOpen, setIsOpen, sendToWhatsApp }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
