import React from "react";
import "./style.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormInputs } from "./signUp.config";
import toast from "react-hot-toast";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        "https://dsasheet1.onrender.com/api/users/signup",
        data
      );
      const { token, user } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      toast.success("Signup successful!");
  
      navigate("/topics");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>

        <input type="text" placeholder="Full Name" {...register("fullName")} />
        <p className="error">{errors.fullName?.message}</p>

        <input type="email" placeholder="Email" {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="error">{errors.password?.message}</p>

        <button type="submit">Sign Up</button>
        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
