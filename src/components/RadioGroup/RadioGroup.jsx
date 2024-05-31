import RadioOption from "../RadioOption/RadioOption";

const RadioGroup = ({ addOption, removeOption }) => {
  return (
    <div className="flex flex-row w-11/12 items-center justify-around rounded-lg h-10 mb-2 bg-gray-300">
      <RadioOption
        label="Usuario"
        value="user"
        addOption={addOption}
        removeOption={removeOption}
      />
      <RadioOption
        label="Administrador"
        value="admin"
        addOption={addOption}
        removeOption={removeOption}
      />
      <RadioOption
        label="Moderador"
        value="moderator"
        addOption={addOption}
        removeOption={removeOption}
      />
    </div>
  );
};

export default RadioGroup;
