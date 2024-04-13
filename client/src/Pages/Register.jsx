import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      return dispatch(signInFailure("Please Fill Out The Details"));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post("api/user/register", formData);
      if (res.data.success === false) {
        dispatch(signInFailure(res.data.message));
      }
      // setLoading(false);
      if (res.data.success === true) {
        dispatch(signInSuccess(res.data));
        navigate("/login");
      }
      // Handle response as needed
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
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
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-lg text-white">
              Jayesh's
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and
            password.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                value={formData.username}
                id="username"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label value="Your Mobile Number" />
              <TextInput
                type="tel" // Changed from "phone"
                placeholder="Mobile Number"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
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
                "Register"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign In
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
  );
};

export default Register;
