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

  //Search by category
  const [searchByCategory, setSearchByCategory] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter( item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if(searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if(searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if(searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item?.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if(!searchType){
      return items
    }
  }

  useEffect( ()=> {
    if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if(!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items, searchByTitle, searchByCategory))
    if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByTitle, searchByCategory))
    if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null,items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

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
      filteredItemsByTitle,
      searchByCategory,
      setSearchByCategory
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
