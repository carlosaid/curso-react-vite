import { useContext, useState, useRef } from 'react'
import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'

function MyAccount() {

  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  const form = useRef(null)

  const editAccount = () =>{
    const formData = new FormData(form.current)
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    //Update Account
    const stringifiedSAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedSAccount)
    context.setAccount(data)
  }

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className='w-full bg-blue-700 text-white rounded-lg py-2 px-4 mt-6' 
          onClick={ () => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditionUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>Your name:</label>
          <input 
            type='text'
            name='name'
            id='name'
            defaultValue={parsedAccount.name} 
            placeholder='Peter Parker'
            className='border border-black rounded-lg py-2 px-4 focus:outline-none placeholder:text-black/40 placeholder:font-light placeholder:text-sm'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-light text-sm'>Your email:</label>
          <input 
            type='text'
            name='email' 
            id='email'
            defaultValue={parsedAccount.email} 
            placeholder='peterparker@marvel.com'
            className='border border-black rounded-lg py-2 px-4 focus:outline-none placeholder:text-black/40 placeholder:font-light placeholder:text-sm'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-light text-sm'>Your password:</label>
          <input 
            type='text'
            name='password' 
            id='password'
            defaultValue={parsedAccount.password} 
            placeholder='********'
            className='border border-black rounded-lg py-2 px-4 focus:outline-none placeholder:text-black/40 placeholder:font-light placeholder:text-sm'
          />
        </div>
        <button 
          className='bg-green-700 text-white rounded-lg px-4 py-2 w-full'
          onClick={ () =>{setView('user-info') , editAccount()} }>
          Edit
        </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditionUserInfo() : renderUserInfo()

  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>MyAccount </h1>
      {renderView()}
    </Layout>
  )
  }
  
  export { MyAccount }