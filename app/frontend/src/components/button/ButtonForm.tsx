interface ButtonFormProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; 
}

function ButtonForm({ label, onClick, disabled }: ButtonFormProps) {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        disabled={disabled} // Désactive le bouton si la propriété disabled est true
        className={`bg-green hover:bg-darkgreen text-white font-bold rounded-full w-4/5 h-10 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {label}
      </button>
    </div>
  )
}

export default ButtonForm
