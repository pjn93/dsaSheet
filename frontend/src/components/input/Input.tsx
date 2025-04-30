import React from "react";
import "./style.scss"; // Optional styling
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const Input: React.FC<InputProps> = ({
  showToggle,
  showPassword,
  onTogglePassword,
  type,
  ...props
}) => {
  const actualType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-wrapper">
      <input className="input" type={actualType} {...props} />
      {showToggle && (
        <span className="toggle-icon" onClick={onTogglePassword}>
          {showPassword ? <IoMdEye/> : <IoIosEyeOff/>}
        </span>
      )}
    </div>
  );
};

export default Input;
