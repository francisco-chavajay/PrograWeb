import { Square, CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";

const RadioOption = ({ label, value, addOption, removeOption }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      addOption(value);
    } else {
      removeOption(value);
    }
  }, [isChecked]);

  return (
    <div className="flex flex-row items-center text-gray-500">
      <span className="cursor-pointer mr-1" onClick={toggleCheck}>
        {isChecked ? (
          <CheckSquare className="w-4 h-4" />
        ) : (
          <Square className="w-4 h-4" />
        )}
      </span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default RadioOption;
