import { useContext } from "react";
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = "underline underline-offset-4";

  //Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  
  const hadleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if(isUserSignOut){
      return(
        <li>
          <NavLink
            to="/SignIn"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={()=> hadleSignOut()}>
            Sign Out
          </NavLink>
        </li>
      )
    } else {
      return (
        <>
        <li className="text-black/60">
          correo@gmail.com
        </li>
        <li>
          <NavLink
            to="/MyOrders"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/MyAccount"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SignIn"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={()=> hadleSignOut()}>
            Sign Out
          </NavLink>
        </li>
        </>
      )
    }
  }

  return (
    <nav className="flex justify-between items-center top-0 fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={()=> context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={()=> context.setSearchByCategory('clothing')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={()=> context.setSearchByCategory('electronics')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furnitures"
            onClick={()=> context.setSearchByCategory('furnitures')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={()=> context.setSearchByCategory('toys')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            onClick={()=> context.setSearchByCategory('others')}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className='flex items-center'>
          <ShoppingBagIcon 
            className='w-6 h-6 text-blac cursor-pointer'
            onClick={ () => {context.openCheckSideMenu()}}
          >
          </ShoppingBagIcon>
          <div className='bg-green-600 w-6 h-6 border rounded-full text-center text-teal-50 '>
            {context.productToCart.length}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
