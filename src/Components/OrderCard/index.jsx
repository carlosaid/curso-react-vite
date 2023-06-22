import { XMarkIcon } from '@heroicons/react/24/solid'

function OrderCar( {id, title, imgeURL, price, handleDelete} ) {
  let renderXMarkIcon

  if (handleDelete) {
    renderXMarkIcon = <XMarkIcon onClick={()=> handleDelete(id)} className='h-6 w-6 text-black cursor-pointer'></XMarkIcon>
  }
  
  return (
    <div className='flex justify-between items-center mb-2'>
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img className='w-full h-full object-cover rounded-lg' src={imgeURL} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-lg font-medium'>{price}</p>
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export { OrderCar }