import { createContext, useState } from "react"

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {

  const [count, setCount] = useState(0)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => { setIsProductDetailOpen(true) }
  const closeProductDetail = () => { setIsProductDetailOpen(false) }

  const [productShow, setProductShow] = useState({})

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productShow, 
      setProductShow
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
