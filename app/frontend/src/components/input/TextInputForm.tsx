interface TextInputProps {
  placeholder: string;
  label: string;
  id: string;
}

function TextInputForm({ placeholder, label, id }: TextInputProps) {
  return (
    <div className="w-4/5 mx-auto">
      <label htmlFor={id} className="block text-formtext font-bold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="border p-2 rounded-full w-full mt-1"
        aria-label={label}
      />
    </div>
  );
}

export default TextInputForm;
