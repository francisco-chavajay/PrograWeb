import { useState } from "react";
import { User, Loader } from "lucide-react";
import axios from "axios";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useNavigate } from "react-router-dom";

const FORM_INITIAL_STATE = {
  username: "",
  password: "",
};

const FormLogin = ({ visibilityState, toggleForms }) => {
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const [resMessage, setResMessage] = useState();
  const [isWaitingRes, setIsWaitingRes] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsWaitingRes(true);

    axios
      .post("http://localhost:8090/api/authentication/signin", formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.accessToken);
        setIsWaitingRes(false);
        setResMessage();
        navigate("/home");
      })
      .catch((err) => {
        setIsWaitingRes(false);
        setResMessage(err?.response?.data.message);
      });
  };

  return (
    <form
      className={`w-full h-full flex flex-col items-center absolute transition-transform
        ${visibilityState ? "translate-y-0" : "translate-y-full"}`}
      onSubmit={handleOnSubmit}
    >
      <h2 className="text-2xl text-center mt-4 mb-8">Inicie Sesion</h2>
      <TextInput
        name="username"
        onChange={handleChange}
        value={formData.email}
        type="text"
        placeholder="Usuario"
        icon={<User className="text-gray-500" />}
      />

      <PasswordInput
        name="password"
        onChange={handleChange}
        value={formData.password}
        placeholder="Contraseña"
      />

      <button
        disabled={isWaitingRes}
        className={`w-11/12 h-10 text-white rounded-full 
          ${isWaitingRes ? "bg-blue-400 cursor-wait" : "bg-blue-600"}`}
      >
        {isWaitingRes ? (
          <Loader className="animate-spin m-auto" />
        ) : (
          <span>INGRESAR</span>
        )}
      </button>
      <p className="font-light underline cursor-pointer text-center text-gray-500">
        Olvide la Contraseña
      </p>
      <p className="mt-4 font-medium text-center text-red-600">{resMessage}</p>
      <div className="flex flex-col flex-grow justify-end">
        <p
          className="font-light cursor-pointer text-center text-gray-500"
          onClick={toggleForms}
        >
          Cree una cuenta aqui
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
