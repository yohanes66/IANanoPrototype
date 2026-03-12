import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [sheet, setSheet] = useState(null) // { type, payload }
  const [toasts, setToasts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const openSheet = useCallback((type, payload = {}) => {
    setSheet({ type, payload })
  }, [])

  const closeSheet = useCallback(() => {
    setSheet(null)
  }, [])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id))
    }, 3000)
  }, [])

  const simulateAction = useCallback(async (action) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    try {
      action()
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <UIContext.Provider value={{ sheet, openSheet, closeSheet, toasts, addToast, isLoading, setIsLoading, simulateAction }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
