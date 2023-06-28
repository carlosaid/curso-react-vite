import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { ShoppingCartProvider, initializeLocalStorage, ShoppingCartContext }  from '../../Context'
import { useContext } from 'react'
import './App.css'
import { Home } from '../Home'
import { MyAccount } from '../MyAccount'
import { MyOrder } from '../MyOrder'
import { MyOrders } from '../MyOrders'
import { NotFound } from '../NotFound'
import { SignIn } from '../SignIn'
import { Navbar } from '../../Components/Navbar'
import { CheckSideMenu } from '../../Components/CheckSideMenu'

const AppRoutes = () => {

  const context = useContext(ShoppingCartContext)

  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)

  //Has Account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState =  Object.keys(context.account).length === 0 
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  const isUserSignOut = context.signOut || parsedSignOut


  let routes = useRoutes([
    { path: '/', element: hasUserAnAccount && !isUserSignOut? <Home /> : <Navigate replace to={'/SignIn'}/>},
    { path: '/Clothes', element: hasUserAnAccount && !isUserSignOut? <Home /> : <Navigate replace to={'/SignIn'}/>},
    { path: '/Electronics', element: hasUserAnAccount && !isUserSignOut? <Home /> : <Navigate replace to={'/SignIn'}/>},
    { path: '/Furnitures', element: hasUserAnAccount && !isUserSignOut? <Home /> : <Navigate replace to={'/SignIn'}/>},
    { path: '/Toys', element: hasUserAnAccount && !isUserSignOut? <Home /> : <Navigate replace to={'/SignIn'}/>},
    { path: '/Others', element: hasUserAnAccount && !isUserSignOut? <Home /> : <Navigate replace to={'/SignIn'}/>},
    { path: 'MyAccount', element: <MyAccount />},
    { path: 'MyOrder', element: <MyOrder />},
    { path: 'MyOrders', element: <MyOrders />},
    { path: 'MyOrders/last', element: <MyOrder />},
    { path: 'MyOrders/:id', element: <MyOrder />},
    { path: 'MyAccount', element: <MyAccount />},
    { path: '/*', element: <NotFound />},
    { path: 'SignIn', element: <SignIn /> }
  ])

  return routes
}

function App() {

  initializeLocalStorage()

  return (
    <ShoppingCartProvider>
    <BrowserRouter >
      < AppRoutes />
      < Navbar />
      < CheckSideMenu />
    </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export { App }
