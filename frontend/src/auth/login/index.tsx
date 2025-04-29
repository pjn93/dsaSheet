import React from "react";
import "./style.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormInputs } from "./login.config";
import toast from "react-hot-toast";


const Login: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });


  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", data);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      // Navigate after showing toast
      setTimeout(() => {
        navigate("/topics");
      }, 1000); // Adjust delay as needed
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="error">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>

        <button type="submit">Login</button>
        <p className="signup-text">
        Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
