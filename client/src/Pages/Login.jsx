import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("Please Fill Out The Fields");
    }
    try {
      setLoading(true);
      setError(null);

      

      const res = await axios.post("/api/user/login", formData);
      localStorage.setItem("token", JSON.stringify(res.data.token));

      if (res.data.success === false) {
        return setError(res.data.message);
      }
      setLoading(false);
      if (res.data.success === true) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          {/* Left */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-lg text-white">
              Jayesh's
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5">
            This is a Login Page. You can sign up with your email and password.
          </p>
        </div>
        <div className="">
          {/* Right */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
              <div>
                <Label value="Your Email" />
                <TextInput
                  type="text"
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label value="Your Password" />
                <TextInput
                  type="password"
                  placeholder="Your Password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <OAuth />
            </form>

            <div className="flex gap-2 text-sm mt-5">
              <span>Don't Have an account?</span>
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </div>
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
