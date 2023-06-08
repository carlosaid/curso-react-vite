import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider }  from '../../Context'
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
  let routes = useRoutes([
    { path: '/', element: <Home />},
    { path: 'MyAccount', element: <MyAccount />},
    { path: 'MyOrder', element: <MyOrder />},
    { path: 'MyOrders', element: <MyOrders />},
    { path: 'MyAccount', element: <MyAccount />},
    { path: '/*', element: <NotFound />},
    { path: 'SignIn', element: <SignIn /> }
  ])

  return routes
}

function App() {
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
