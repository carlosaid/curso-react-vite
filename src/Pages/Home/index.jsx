import { useContext, useState } from "react"
import { Layout } from "../../Components/Layout"
import { Card } from "../../Components/Card/indes"
import { ProductDetail } from "../../Components/ProductDetail"
import { ShoppingCartContext } from "../../Context"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <div>we don't have anything xd</div>
      )
    }
  }

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center relative w-80 mb-4">
          <h1 className="font-medium text-xl">Exclusive Products</h1>
        </div>
        <div className='flex items-center justify-center relative'>
          <input
            type="text"
            placeholder="Search a product"
            className="rounded-lg border border-black w-80 px-10 p-4 pr-4 mb-4 focus:outline-none"
            onChange={(event) => context.setSearchByTitle(event.target.value)}
          />
          <div className='absolute left-3 top-4'>
            <MagnifyingGlassIcon className='w-6 h-6 text-gray-800'/>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
          {renderView()}
        </div>
        <ProductDetail />
      </Layout>
    </>
  )
}

export { Home }