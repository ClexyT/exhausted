import { useState, useMemo } from 'react'
import productsData from '../data/products.json'

export function useProducts(categoryFilter = 'all') {
  const [search, setSearch] = useState('')

  const products = useMemo(() => {
    return productsData.filter(p => {
      const matchCat = categoryFilter === 'all' || p.category === categoryFilter
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [categoryFilter, search])

  return { products, search, setSearch }
}
