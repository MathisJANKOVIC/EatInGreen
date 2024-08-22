import React from 'react'
import NavBar from '../../components/header/NavBar'

const Profil: React.FC = () => {
  const messages: JSX.Element[] = []

  for (let i = 0; i < 4; i++) {
    messages.push(
      <div className='bg-gray-100 p-4 m-2 rounded-md text-[#A07E53]' key={i}>
          ceci est un message de l utilisateur, c est un exemple.
      </div>
    )
  }

  return (
  
    <main className='bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto flex flex-col transform translate-y-12'>
      <NavBar />
      <div className='flex mt-6 space-x-4 flex-grow'>
        <div className='w-3/4 flex flex-col space-y-4 h-full'>
          <div className='bg-white p-4 rounded-lg shadow-md flex-1 overflow-auto'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Achats récent</h2>
            <div className='bg-green-200 p-4 rounded-md text-center text-[#A07E53]'>
                Vous n savez encore rien acheté 
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md flex-1 overflow-auto'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Avis laissés</h2>
            <div className='grid grid-cols-4 gap-4'>
              {messages}
            </div>
          </div>
        </div>
        <div className='w-1/4'>
          <div className='bg-white p-4 rounded-lg shadow-md h-full'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Votre compte</h2>
            <div className='flex items-center mb-4'>
              <img
                src='https://via.placeholder.com/50'
                alt='Profile'
                className='rounded-full w-12 h-12 mr-4'
              />
              <div>
                <h3 className='font-semibold text-[#A07E53]'>Axel Calveit</h3>
                <p className='text-[#A07E53]'>BIO</p>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center text-[#A07E53]'>
                <span>email</span>
                <button className='ml-auto text-[#83C082]'>✎</button>
              </div>
              <div className='flex items-center text-[#A07E53]'>
                <span>mdp</span>
                <button className='ml-auto text-[#83C082]'>✎</button>
              </div>
              <div    className='flex items-center text-[#A07E53]'>
                <span>nom</span>
                <button className='ml-auto text-[#83C082]'>✎</button>
              </div>
              <div className='flex items-center text-[#A07E53] '>
                <span>prénom</span>
                <button className='ml-auto text-[#83C082]'>✎</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profil