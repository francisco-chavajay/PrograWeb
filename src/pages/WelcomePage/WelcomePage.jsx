import { useEffect, useState } from "react";
import FormLogin from "../../components/Forms/FormLogin";
import FormSignUp from "../../components/Forms/FormSignUp";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [isFormLoginShown, setIsFormLoginShown] = useState(true);
  const navigate = useNavigate();

  const toggleForms = () => {
    setIsFormLoginShown((prev) => !prev);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="bg-blue-200 w-full h-screen flex justify-center items-center">
      <section className="flex flex-row rounded-3xl overflow-hidden w-[700px] h-[500px]">
        <div className="w-1/2">
          <img
            className="object-center object-cover w-full h-full"
            src="./login-design.jpg"
          />
        </div>
        <div className="w-1/2 bg-slate-50 relative">
          <FormLogin
            visibilityState={isFormLoginShown}
            toggleForms={toggleForms}
          />
          <FormSignUp
            visibilityState={isFormLoginShown}
            toggleForms={toggleForms}
          />
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
