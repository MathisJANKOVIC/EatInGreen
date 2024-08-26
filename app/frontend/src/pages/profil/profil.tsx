import React, { useState, useEffect } from 'react'
import useUpdateProfile from '../../hooks/useUpdateProfile'
import NavBar from '../../components/header/NavBar'

const EditProfile: React.FC = () => {
  const { updateProfile, loading: updateLoading, error: updateError } = useUpdateProfile()
  
  const [formData, setFormData] = useState({
    email: '',
    lastName: '',
    firstName: '',
    password: '', 
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const userId = localStorage.getItem('id') // Don't touch, please

    if (userId) {
      await updateProfile(userId, formData)
    } else {
      console.error('User ID not found')
    }
  }

  return (
    <main className='bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto flex flex-col transform translate-y-12'>
      <NavBar />
      <div className='flex mt-6 space-x-4 flex-grow'>
        <div className='w-3/4 flex flex-col space-y-4'>
          {/* Affichage des informations actuelles */}
          <div className='bg-white p-4 rounded-lg shadow-md flex-1 overflow-auto'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Vos messages</h2>
            <div className='flex space-x-4'>
              <div className='flex-1 bg-gray-100 p-4 rounded-md text-[#A07E53]'>
                <h3 className='font-medium'>Message 1</h3>
                <p>Contenu du message 1.</p>
              </div>
              <div className='flex-1 bg-gray-100 p-4 rounded-md text-[#A07E53]'>
                <h3 className='font-medium'>Message 2</h3>
                <p>Contenu du message 2.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de modification */}
        <div className='w-1/4'>
          <div className='bg-white p-4 rounded-lg shadow-md h-full'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Modifier votre compte</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium'>Email</label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 p-2 border rounded w-full'
                />
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium'>Mot de passe</label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='mt-1 p-2 border rounded w-full'
                />
              </div>
              <div>
                <label htmlFor='lastName' className='block text-sm font-medium'>Nom</label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='mt-1 p-2 border rounded w-full'
                />
              </div>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium'>Prénom</label>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='mt-1 p-2 border rounded w-full'
                />
              </div>
              <button
                type='submit'
                className='bg-[#83C082] text-white p-4 rounded-md w-full'
                disabled={updateLoading}
              >
                {updateLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              {updateError && <p className='text-red-500'>{updateError}</p>}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EditProfile
