const TextInput = ({ type, placeholder, icon, name, onChange, value }) => {
  return (
    <div className="flex flex-row items-center w-11/12 h-10 pl-2 rounded-lg overflow-hidden mb-2 bg-gray-300">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className="w-full h-full ml-1 bg-inherit focus:outline-none placeholder:text-gray-500"
      />
    </div>
  );
};

export default TextInput;
