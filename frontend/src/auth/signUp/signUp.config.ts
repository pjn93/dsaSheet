import * as yup from "yup";

export const loginSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export type LoginFormInputs = yup.InferType<typeof loginSchema>;
