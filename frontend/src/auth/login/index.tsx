import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormInputs } from "./login.config";
import toast from "react-hot-toast";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "https://dsa-backend-b74p.onrender.com/api/users/login", 
        data,
        {
          headers: {
            'Content-Type': 'application/json',  // This specifies that we're sending JSON
          },
        }
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
       reset();
      toast.success("Login successful");

      // Navigate after showing toast
      setTimeout(() => {
        navigate("/topics");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
<div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <Input type="email" placeholder="Email" {...register("email")} />
        <Input type="email" placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>
        <Input
          placeholder="Password"
          showToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>

        <Button label="Login" />
        <Button label="Login" />
        <p className="signup-text">
          Don't have an account? <Link to="/">Sign Up</Link>
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
