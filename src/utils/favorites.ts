import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'nador_x_favorites'

export function getFavorites(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (e) {
    console.error('Failed to read favorites', e)
    return []
  }
}

export function saveFavorites(ids: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
    // Dispatch a custom event so any open component updates immediately
    window.dispatchEvent(new Event('nador_favorites_changed'))
  } catch (e) {
    console.error('Failed to save favorites', e)
  }
}

export function toggleFavorite(id: string): boolean {
  const current = getFavorites()
  const exists = current.includes(id)
  let updated: string[]
  if (exists) {
    updated = current.filter((item) => item !== id)
  } else {
    updated = [...current, id]
  }
  saveFavorites(updated)
  return !exists // returns true if now favorited
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id)
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites())

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getFavorites())
    }
    window.addEventListener('nador_favorites_changed', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('nador_favorites_changed', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const toggle = (id: string) => {
    return toggleFavorite(id)
  }

  return {
    favorites,
    isFav: (id: string) => favorites.includes(id),
    toggle,
    count: favorites.length,
    clearAll: () => saveFavorites([]),
  }
}
