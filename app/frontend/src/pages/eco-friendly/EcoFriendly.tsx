import { useState } from 'react'
import NavBar from '../../components/header/NavBar'
import Citron from '../../assets/Citron.png'

const EcoFriendly = () => {
  const [showAll] = useState(false)
  const cartItems = [
    { id: 1, name: 'fruit1', description: 'Description of fruit1', quantity: 'XXX', price: 'XXX €', image: Citron },
    { id: 2, name: 'fruit2', description: 'Description of fruit2', quantity: 'XXX', price: 'XXX €', image: Citron },
    { id: 3, name: 'fruit3', description: 'Description of fruit3', quantity: 'XXX', price: 'XXX €', image: Citron },
    { id: 4, name: 'fruit4', description: 'Description of fruit4', quantity: 'XXX', price: 'XXX €', image: Citron },
    { id: 5, name: 'fruit5', description: 'Description of fruit5', quantity: 'XXX', price: 'XXX €', image: Citron },
  ]

  const itemsToShow = showAll ? cartItems : cartItems.slice(0, 100)

  return (
    <main className='bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto flex flex-col transform translate-y-12'>
      <NavBar />
      <div className='flex mt-6 space-x-4 flex-grow justify-between '>

        <div className='w-1/4 bg-white p-4 rounded-lg shadow-md flex flex-col justify-between'>
          <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Par types de produits</h2>

        </div>

        <div className='w-3/4 flex flex-col space-y-4 h-full'>
          <div className='bg-white p-4 rounded-lg shadow-md flex-1 overflow-hidden'>
            <h2 className='text-lg font-semibold mb-4 text-[#A07E53]'>Les plus écologiques</h2>

            <div className='overflow-auto h-80 text-[#83C082]'>
              {itemsToShow.map(item => (
                <div key={item.id} className='flex mb-4 p-4 bg-gray-100 rounded-lg'>
                  <img src={item.image} alt={item.name} className='w-24 h-24 mr-4' />
                  <div className='flex-grow'>
                    <h3 className='font-semibold text-[#A07E53]'>{item.name}</h3>
                    <p className='text-[#A07E53]'>{item.description}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default EcoFriendly
