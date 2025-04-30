import React from "react";
import "./style.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormInputs } from "./signUp.config";
import toast from "react-hot-toast";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
     const response = await axios.post(
        "https://dsa-backend-b74p.onrender.com/api/users/signup", 
        data,
        {
          headers: {
            'Content-Type': 'application/json',  
          },
        }
      );
      const { token, user } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      reset();
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

        <Input type="text" placeholder="Full Name" {...register("fullName")} />
        <p className="error">{errors.fullName?.message}</p>

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

        <Button label="Sign Up" />
        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
