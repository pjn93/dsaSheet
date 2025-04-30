import React from "react";
import "./style.scss"; // Optional styling

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string; // Optional label instead of children
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button {...props}>
      {label}
    </button>
  );
};

export default Button;
