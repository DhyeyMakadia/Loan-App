import { useState } from "react";
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(ValidationMessage.InvalidEmail)
      .required(ValidationMessage.EmailRequired),
    password: Yup.string().required(ValidationMessage.PasswordRequired),
  });

  const handleSignIn = (values: FormikValues) => {
    console.log("values", values);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="login-wrapper">
        <div className="login-container">
          <div className="login-main">
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                  <h1 className="title">Login</h1>
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
                  <Button
                    variant="contained"
                    type="submit"
                    className="btn-dark"
                    fullWidth
                    title="Login"
                  >
                    Login
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

export default LoginPage;
