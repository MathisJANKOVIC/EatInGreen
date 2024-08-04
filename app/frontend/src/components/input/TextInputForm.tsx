interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInputForm({ placeholder, label, id, value, onChange }: TextInputProps) {
  return (
    <div className="w-4/5 mx-auto">
      <label htmlFor={id} className="block text-formtext font-bold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        placeholder={placeholder}
        className="border p-2 rounded-full w-full mt-1"
        aria-label={label}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInputForm;
