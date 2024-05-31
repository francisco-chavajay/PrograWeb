import axios from "axios";
import { Settings2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [content, setContent] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorState, setErrorState] = useState(false);

  const handleFetchData = (contentType) => {
    axios
      .get(`http://localhost:8090/api/test/${contentType}`, {
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setContent(res.data);
        setErrorState(false);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data.message);
        setErrorState(true);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/test/all")
      .then((res) => setContent(res.data));
  }, []);

  return (
    <div className="w-full h-screen flex flex-row">
      <section className="flex flex-col w-80 bg-purple-600">
        <div className="flex flex-row items-center mt-4 pl-2 py-4 bg-white">
          <p className="font-medium text-2xl">Control Panel</p>
          <Settings2 className="ml-2 w-7 h-7" />
        </div>

        <div className="flex flex-col pl-2 mt-4">
          <span
            onClick={() => handleFetchData("admin")}
            className="cursor-pointer text-lg transition-[font-size] text-white hover:text-xl hover:underline"
          >
            Administrador 
          </span>
          <span
            onClick={() => handleFetchData("moderator")}
            className="cursor-pointer text-lg transition-[font-size] text-white hover:text-xl hover:underline"
          >
            Moderador
          </span>
          <span
            onClick={() => handleFetchData("user")}
            className="cursor-pointer text-lg transition-[font-size] text-white hover:text-xl hover:underline"
          >
            Usuario
          </span>
          <span
            onClick={() => handleFetchData("all")}
            className="cursor-pointer text-lg transition-[font-size] text-white hover:text-xl hover:underline"
          >
            Publico
          </span>
        </div>
      </section>
      <section className="flex flex-1 justify-center items-center bg-slate-400 relative overflow-hidden">
        <div className="w-[500px] h-[400px] bg-slate-100 rounded-lg border border-gray-500 flex items-center justify-center">
          <p className="font-bold">{content}</p>
        </div>
        <div
          className={`absolute bottom-0 right-0 mb-5 transition-transform ease-in duration-200 ${
            errorState ? "mr-5" : "translate-x-full"
          }`}
        >
          <div className="rounded-md bg-red-500 text-white px-3 py-1 flex flex-row items-center font-medium">
            <AlertCircle className="w-5 h-5 mr-1" />
            {errorMessage}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
