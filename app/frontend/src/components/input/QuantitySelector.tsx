import React from 'react'

interface QuantitySelectorProps {
  quantity?: number;
  maxQuantity?: number;
  setQuantity: (quantity: number) => void
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity = 1,
  maxQuantity = 10,
  setQuantity,
}) => {
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }
    
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(maxQuantity, Number(e.target.value)))
    setQuantity(value)
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="px-2 py-1 border-2 border-green text-green font-bold rounded">
        -
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        max={maxQuantity}
        onChange={handleInputChange}
        className="w-16 text-center border-2  rounded"/>
      <button
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="px-2 py-1 border-2 border-green text-green font-bold rounded">
        +
      </button>
    </div>
  )
}

export default QuantitySelector
