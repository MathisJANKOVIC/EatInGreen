interface PasswordInputProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
	label: string
	value: string
	id: string
}

function PasswordInputForm({ placeholder, label, id, value , onChange }: PasswordInputProps) {
  return (
    <div className="w-4/5 mx-auto">
      <label htmlFor={id} className="block text-formtext font-bold">
        {label}
      </label>
      <input
        id={id}
        value={value}
        type="password"
        aria-label={label}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded-full w-full mt-1"/>
    </div>
  )
}

export default PasswordInputForm