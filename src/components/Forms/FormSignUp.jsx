import { useState } from "react";
import { AtSign, User, Loader } from "lucide-react";
import axios from "axios";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import RadioGroup from "../RadioGroup/RadioGroup";

const FORM_INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  roles: [],
};

const FormSignUp = ({ visibilityState, toggleForms }) => {
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const [resMessage, setResMessage] = useState();
  const [resStatus, setResStatus] = useState();
  const [isWaitingRes, setIsWaitingRes] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRole = (value) => {
    setFormData((prev) => {
      const rolesUpdated = [...prev.roles, value];
      return { ...prev, roles: rolesUpdated };
    });
  };

  const handleRemoveRole = (value) => {
    setFormData((prev) => {
      const rolesUpdated = prev.roles.filter((role) => role != value);
      return { ...prev, roles: rolesUpdated };
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsWaitingRes(true);
    axios
      .post("http://localhost:8090/api/user/signup", formData)
      .then((res) => {
        setResStatus(res.status);
        setResMessage(res.data.message);
        setFormData(FORM_INITIAL_STATE);
        setIsWaitingRes(false);
        setTimeout(() => {
          toggleForms();
          setResMessage();
        }, 1900);
      })
      .catch((err) => {
        setResMessage(err?.response?.data.message);
        setResStatus(err?.response.status);
        setIsWaitingRes(false);
        console.log(err);
      });
  };

  return (
    <form
      className={`w-full h-full flex flex-col items-center absolute transition-transform
        ${visibilityState ? "translate-y-full" : "translate-y-0"}`}
      onSubmit={handleOnSubmit}
    >
      <h2 className="text-2xl text-center mt-4 mb-8 ">Registrese</h2>
      <TextInput
        name="username"
        onChange={handleChange}
        value={formData.username}
        type="text"
        placeholder="Usuario"
        icon={<User className="text-gray-500" />}
      />
      <TextInput
        name="email"
        onChange={handleChange}
        value={formData.email}
        type="email"
        placeholder="Correo"
        icon={<AtSign className="text-gray-500" />}
      />
      <RadioGroup addOption={handleAddRole} removeOption={handleRemoveRole} />
      <PasswordInput
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Contraseña"
      />
      <PasswordInput
        name="confirmPassword"
        onChange={handleChange}
        value={formData.confirmPassword}
        placeholder="Confirma tu Contraseña"
      />

      <button
        disabled={isWaitingRes}
        className={`w-11/12 h-10 text-white rounded-full 
          ${isWaitingRes ? "bg-blue-400 cursor-wait" : "bg-blue-600"}`}
      >
        {isWaitingRes ? (
          <Loader className="animate-spin m-auto" />
        ) : (
          <span>CREAR CUENTA</span>
        )}
      </button>
      <p
        className={`mt-4 font-medium text-center ${
          resStatus === 201 ? "text-green-700" : "text-red-600"
        }`}
      >
        {resMessage}
      </p>
      <div className="flex flex-col flex-grow justify-end">
        <p
          className="font-light cursor-pointer text-center text-gray-500"
          onClick={toggleForms}
        >
          Ya tienes cuenta? Inicie Sesion
        </p>
      </div>
    </form>
  );
};

export default FormSignUp;
