import { createContext, useContext, useState } from 'react'

const DesignVariantContext = createContext(null)

export function DesignVariantProvider({ children }) {
  const [variant, setVariantState] = useState(
    () => localStorage.getItem('designVariant') || 'option1'
  )

  const setVariant = (v) => {
    localStorage.setItem('designVariant', v)
    setVariantState(v)
  }

  return (
    <DesignVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </DesignVariantContext.Provider>
  )
}

export function useDesignVariant() {
  const ctx = useContext(DesignVariantContext)
  if (!ctx) throw new Error('useDesignVariant must be used within DesignVariantProvider')
  return ctx
}
