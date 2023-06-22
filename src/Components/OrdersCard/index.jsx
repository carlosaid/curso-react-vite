import { ChevronRightIcon } from '@heroicons/react/24/solid'

function OrdersCard( {totalPrice, totalProducts} ) {
  return(
    <div className='flex justify-between items-center mb-3 border border-black rounded-lg w-80 p-4'>
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'> 
          <span className='font-light'>01.02.23</span>
          <span className='font-light'>{totalProducts} articles</span>
        </p>
        <p className='flex items-center gap-2'>
          <span className='font-medium text-2xl'>${totalPrice}</span>
          <ChevronRightIcon className='w-6 h-6 text-black cursor-pointer'/>
        </p>
      </div>
    </div>
  )
}

export { OrdersCard }