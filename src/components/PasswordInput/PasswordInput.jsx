import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const PasswordInput = ({ placeholder, name, onChange, value }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <div className="flex flex-row items-center w-11/12 h-10 pl-2 rounded-lg overflow-hidden mb-2 bg-gray-300">
      <span className="cursor-pointer" onClick={togglePasswordVisibility}>
        {isPasswordShown ? (
          <Eye className="w-5 h-5 text-gray-500" />
        ) : (
          <EyeOff className="w-5 h-5 text-gray-500" />
        )}
      </span>
      <input
        type={isPasswordShown ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className="w-full h-full ml-1 bg-inherit focus:outline-none placeholder:text-gray-500"
      />
    </div>
  );
};

export default PasswordInput;
