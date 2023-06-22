import { createContext, useState } from "react"

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {

  const [count, setCount] = useState(0)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => { setIsProductDetailOpen(true) }
  const closeProductDetail = () => { setIsProductDetailOpen(false) }

  const [isCheckSideMenuOpen, setIsCheckSideMenuOpen] = useState(false)
  const openCheckSideMenu = () => { setIsCheckSideMenuOpen(true) }
  const closeCheckSideMenu = () => { setIsCheckSideMenuOpen(false) }

  const [productShow, setProductShow] = useState({})
  const [productToCart, setProductToCart] = useState([])

  const [order, setOrder] = useState([])

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productShow, 
      setProductShow,
      productToCart,
      setProductToCart,
      isCheckSideMenuOpen,
      setIsCheckSideMenuOpen,
      openCheckSideMenu,
      closeCheckSideMenu,
      order,
      setOrder
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
