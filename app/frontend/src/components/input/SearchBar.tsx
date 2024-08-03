interface SearchInputProps {
  placeholder: string;
  id: string;
}

function SearchInputForm({ placeholder, id }: SearchInputProps) {
  return (
    <div className="w-4/5 mx-auto">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="border p-2 rounded-full w-[90%] mt-1 border-gray-300 outline-none transition-shadow focus:shadow-outline-green"
        aria-label={placeholder}
      />
    </div>
  );
}

export default SearchInputForm;
