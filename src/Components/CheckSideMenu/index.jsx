import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { OrderCar } from '../OrderCard'
import { totalPrice } from '../../Util'
import './styles.css'

function CheckSideMenu() {
  const context = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProducts = context.productToCart.filter( product => product.id != id)
    context.setProductToCart(filteredProducts)
    context.setCount(context.count - 1)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.productToCart,
      totalProducts: context.productToCart.length,
      totalPrice: totalPrice(context.productToCart)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setProductToCart([])
  }

  return (
    <aside className={ `${context.isCheckSideMenuOpen ? 'flex' : 'hidden'} check-side-menu flex flex-col right-0 fixed border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2>
        <div>
          <XMarkIcon 
            className='h-6 w-6 cursor-pointer text-black'
            onClick={ () => context.closeCheckSideMenu()}
          >
          </XMarkIcon>
        </div>
      </div>
      <div className='px-6 overflow-y-scroll flex-1'>
        {
          context.productToCart.map( (product) => (
            <OrderCar 
              key={product.id}
              id={product.id}
              title={product.title}
              imgeURL={product.image}
              price={product.price}
              handleDelete={handleDelete}
              /> 
          ))
        }
      </div>
      <div className='px-6'>
        <p className='flex justify-between items-center'>
          <span className='font-light'>Total:</span>
          <span className='font-medium text-2xl'>${totalPrice(context.productToCart)}</span>
        </p>
        <Link to='MyOrders/last'>
          <button 
            className='bg-black text-white w-full py-3 my-2 rounded-lg'
            onClick={ () => handleCheckout()}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  )
}

export { CheckSideMenu }