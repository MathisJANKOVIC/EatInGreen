interface PasswordInputProps {
	placeholder: string;
	label: string;
	id: string;
}
  
function PasswordInputForm({ placeholder, label, id }: PasswordInputProps) {
	return (
		<div className="w-4/5 mx-auto">
			<label htmlFor={id} className="block text-formtext font-bold">
				{label}
			</label>
			<input
				type="password"
				id={id}
				placeholder={placeholder}
				className="border p-2 rounded-full w-full mt-1"
				aria-label={label}/>
		</div>
	);
}
  
export default PasswordInputForm;