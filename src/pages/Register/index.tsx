import { FC, useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Avatar,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { images } from "../../shared/assets/images/index";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { ValidationMessage } from "shared/utils/resources";
// import AuthService from "services/auth";
// import { StatusCode } from "shared/constants";
import { useToasts } from "react-toast-notifications";
import { Helmet } from "react-helmet-async";
// import Cookies from "js-cookie";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(ValidationMessage.InvalidEmail)
      .required(ValidationMessage.EmailRequired),
    password: Yup.string().required(ValidationMessage.PasswordRequired),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), ""],
        ValidationMessage.InvalidConfirmPassword
      )
      .required(ValidationMessage.PasswordRequired),
  });

  const handleSignIn = (values: FormikValues) => {
    console.log("values", values);
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className="login-wrapper">
        <div className="login-container">
          <div className="login-main">
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}
              enableReinitialize
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <h1 className="title">Register</h1>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ pb: "20px" }}
                    error={!!(errors.email && touched.email)}
                  >
                    <InputLabel htmlFor="email">Username</InputLabel>
                    <OutlinedInput
                      name="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <Avatar src={images.UserIC} title="User" />
                        </InputAdornment>
                      }
                      label="Username"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="email" />
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ pb: "12px" }}
                    error={!!(errors.password && touched.password)}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      name="password"
                      type={showPassword ? "password" : "text"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Avatar
                              src={
                                showPassword
                                  ? images.ShowPasswordIC
                                  : images.HidePasswordIC
                              }
                              title={
                                showPassword ? "Show Password" : "Hide Password"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="password" />
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    sx={{ pb: "12px" }}
                    error={!!(errors.confirmPassword && touched.confirmPassword)}
                  >
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      type={showConfirmPassword ? "password" : "text"}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <Avatar
                              src={
                                showConfirmPassword
                                  ? images.ShowPasswordIC
                                  : images.HidePasswordIC
                              }
                              title={
                                showConfirmPassword ? "Show Password" : "Hide Password"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="confirmPassword" />
                    </FormHelperText>
                  </FormControl>
                  <Button
                    variant="contained"
                    type="submit"
                    className="btn-dark"
                    fullWidth
                    title="confirmPassword"
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
