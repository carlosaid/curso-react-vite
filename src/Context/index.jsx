import { createContext, useEffect, useState } from "react"

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
  
  //Get Products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  //Search products by title
  const [searchByTitle, setSearchByTitle ] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter( item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  useEffect( ()=> {
    if(searchByTitle) setFilteredItems(filteredItemsByTitle(items, searchByTitle))
  }, [items, searchByTitle])

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
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      setFilteredItems,
      filteredItemsByTitle
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
