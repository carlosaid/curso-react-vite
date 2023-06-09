import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { Layout } from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //Has Account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () =>{
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)

    return <Navigate replace={'/to'}/>
  }

  const createAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)

    handleSignIn()
  }
  
  const renderLogin = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link
          to='/'>
          <button 
            className='bg-green-700 disabled:bg-black/40 text-white  w-full rounded-lg py-3 mt-4 mb-2'
            disabled={!hasUserAnAccount}
            onClick={ ()=> handleSignIn()}>
            Log in
          </button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
        </div>
        <button 
          className='bg-blue-700 text-white disabled:text-white/40 w-full disabled:border-black/40 rounded-lg mt-6 py-3'
          onClick={ () => setView('create-user-info')}
          disabled={hasUserAnAccount}>
          Sign up
        </button>
      </div>
    )
  }
  
  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>Your name:</label>
          <input 
            type='text'
            name='name'
            id='name'
            defaultValue={parsedAccount?.name}
            placeholder='Peter Parker'
            className='border border-black rounded-lg py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/40 focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-light text-sm'>Your email:</label>
          <input 
            type='text'
            name='email'
            id='email'
            defaultValue={parsedAccount?.email}
            placeholder='peterparker@gmail.com'
            className='border border-black rounded-lg py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-light text-sm'>Your Password:</label>
          <input 
            type='password' 
            name='password' 
            id='password'
            defaultValue={parsedAccount?.password}
            placeholder='********'
            className='border border-black rounded-lg py-2 px-4 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none'
          />
        </div>
        <Link to='/'>
          <button
            className='w-full bg-green-700 text-white rounded-lg py-3 hover:bg-green-800'
            onClick={ () => createAccount() }>
            Create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info'? renderCreateUserInfo() : renderLogin()

  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Welcome</h1>
      {renderView()}
    </Layout>
  )
}
  
export { SignIn }