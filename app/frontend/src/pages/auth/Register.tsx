import React, { useState } from 'react'
import TextInputForm from '../../components/input/TextInputForm'
import { useNavigate } from 'react-router-dom'
import PasswordInputForm from '../../components/input/PasswordInputForm'
import ButtonForm from '../../components/button/ButtonForm'
import useRegisterForm from '../../hooks/useRegisterForm'
import Logo from '../../assets/Logo.png'

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordcheck: ''
  })

  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const { sendFormData, loading, error, response } = useRegisterForm()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevFormData => {
      const newFormData = { ...prevFormData, [id]: value }
      if (id === 'password' || id === 'passwordcheck') {
        setPasswordsMatch(newFormData.password === newFormData.passwordcheck)
      }
      return newFormData
    })
  }

  const handleClick = async () => {
    if (!passwordsMatch) {
      alert('Passwords do not match.')
      return
    }

    try {
      const response = await sendFormData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      })

      if (response && response.token) { // Assuming response.success indicates success
        navigate('/login')
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
          <label htmlFor='Logo' className='block text-center font-bold text-lg text-formtext'>
              Inscrivez-vous et commencez vos achats
          </label>
        </div>
        <div className='h-1/6'>
          <TextInputForm id='firstName' label='First name' placeholder='Enter your first name' value={formData.firstName} onChange={handleChange} />
          <TextInputForm id='lastName' label='Last name' placeholder='Enter your last name' value={formData.lastName} onChange={handleChange} />
          <TextInputForm id='email' label='Email' placeholder='Enter your email' value={formData.email} onChange={handleChange} />
          <TextInputForm id='phoneNumber' label='Phone number' placeholder='Enter your phone number' value={formData.phoneNumber} onChange={handleChange} />
          <PasswordInputForm id='password' label='Password' placeholder='Enter your password' value={formData.password} onChange={handlePasswordChange} />
          <PasswordInputForm id='passwordcheck' label='Confirm Password' placeholder='Enter your password again' value={formData.passwordcheck} onChange={handlePasswordChange} />
          {!passwordsMatch && <p className='text-red-500 text-sm'>Passwords do not match</p>}
          <ButtonForm label='Register' onClick={handleClick} />
          <a href="/Login" className="p-2 text-center flex-1 text-[#A07E53]">
            Login
          </a>
          {loading && <p className='text-center text-gray-500'>Loading...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}
          {response && <p className='text-center text-green-500'>Registration successful!</p>}
        </div>
      </main>
    </div>
  )
}

export default Register
