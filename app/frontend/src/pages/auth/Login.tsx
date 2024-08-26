import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextInputForm from '../../components/input/TextInputForm'
import PasswordInputForm from '../../components/input/PasswordInputForm'
import ButtonForm from '../../components/button/ButtonForm'
import Logo from '../../assets/Logo.png'
import useLoginForm from '../../hooks/useLoginForm'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { sendFormData, loading, error, response } = useLoginForm()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }))
  }

  const handleClick = async () => {
    try {
      const response = await sendFormData({
        email: formData.email,
        password: formData.password,
      })

      if (response && response.token) {
        localStorage.setItem('authToken', response.token)
        navigate('/')
      }
    } catch (error) {
      console.error('Failed to send form data:', error)
    }
  }

  return (
    <div>
      <main className='inset-y-0 left-0 w-4/12 h-lvh bg-gray-300'>
        <div>
          <img src={Logo} alt='Example' className='w-4/5 h-auto mx-auto' />
          <label htmlFor='Logo' className='block text-center font-bold text-lg text-formtext'>Connectez-vous à votre compte</label>
        </div>
        <div className='h-1/6'>
          <TextInputForm id='email' label='Email' placeholder='Enter your email' value={formData.email} onChange={handleChange} />
          <PasswordInputForm id='password' label='Password' placeholder='Enter your password' value={formData.password} onChange={handleChange} />
          <ButtonForm label='Connect' onClick={handleClick} />
          <a href="/Register" className="p-2 text-center flex-1 text-[#A07E53]">
            Register
          </a>
          {loading && <p className='text-center text-gray-500'>Loading...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}
          {response && response.token && <p className='text-center text-green-500'>Login successful!</p>}
        </div>
      </main>
    </div>
  )
}

export default Login
