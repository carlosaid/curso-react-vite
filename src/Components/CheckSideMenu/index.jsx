import { useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { OrderCar } from '../OrderCard'
import { totalPrice } from '../../Util'
import './styles.css'

function CheckSideMenu() {
  const context = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProducts = context.productToCart.filter( product => product.id != id)
    context.setProductToCart(filteredProducts)
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
      <div className='px-6 overflow-y-scroll'>
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
      </div>
    </aside>
  )
}

export { CheckSideMenu }