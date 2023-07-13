import { useContext } from "react"
import { PlusIcon , CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from "../../Context"

function Card({ data }) {
  const context = useContext(ShoppingCartContext)

  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductShow(productDetail)
  }

  const addProductToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setProductToCart([...context.productToCart, productData])
    context.openCheckSideMenu()
  }

  const renderIcon = (id) => {
    const isInCart = context.productToCart.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1">
          <CheckIcon className="h-6 w-6 text-black"></CheckIcon>
        </div>
      )
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductToCart(event, data)}>
          <PlusIcon className="h-6 w-6 text-black"></PlusIcon>
        </div>
      )
    }
  }

  return (
    <div
      className='shadow-xl bg-white cursor-pointer w-56 h-60 rounded-lg transform transition-transform hover:scale-110'
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.category}
        </span>
        <img
          className="w-full h-full object-contain rounded-lg"
          src={data.image}
          alt={data.title}
        />
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light p-2 truncate max-w-full">{data.title}</span>
        <span className="text-lg font-medium p-2">${data.price}</span>
      </p>
    </div>
  );
}

export { Card };
