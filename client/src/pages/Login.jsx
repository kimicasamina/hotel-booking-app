import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="border rounded-md text-neutral-200 p-2 "
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border rounded-md text-neutral-200 p-2 "
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="bg-violet-500 rounded-md text-neutral-200 p-2 px-8"
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}
