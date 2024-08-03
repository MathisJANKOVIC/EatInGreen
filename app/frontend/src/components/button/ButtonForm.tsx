interface ButtonFormProps {
  label: string;
  onClick: () => void;
}

function ButtonForm({ label, onClick }: ButtonFormProps) {
  return (
    <div className="flex justify-center items-center">
      <button 
        onClick={onClick} 
        className="bg-green hover:bg-darkgreen text-white font-bold rounded-full w-4/5 h-10">
        {label}
      </button>
    </div>
  );
};

export default ButtonForm;