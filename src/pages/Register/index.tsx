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
  CircularProgress,
} from "@mui/material";
import { images } from "../../shared/assets/images/index";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { ValidationMessage } from "shared/utils/resources";
import AuthService from "services/auth";
import { StatusCode } from "shared/constants";
import { useToasts } from "react-toast-notifications";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";
import Cookies from "js-cookie";

const RegisterPage = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(ValidationMessage.NameRequired),
    mobile_number: Yup.string().required(ValidationMessage.MobileRequired),
    password: Yup.string().required(ValidationMessage.PasswordRequired),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), ""],
        ValidationMessage.InvalidConfirmPassword
      )
      .required(ValidationMessage.PasswordRequired),
  });

  const handleSignIn = (values: FormikValues) => {
    const payload = {
      mobile_number: values.mobile_number,
      password: values.password,
    };
    AuthService.signIn(payload)
      .then((response) => {
        if (!response.data || !response.data.authToken) {
          setShowLoader(false);
          addToast(ValidationMessage.InvalidCredentials, {
            appearance: "error",
            autoDismiss: true,
          });
          return;
        }
        if (response.data) {
          Cookies.set("auth_token", response.data.authToken);
          Cookies.set("user_id", String(response.data.id));
          setShowLoader(false);
          addToast(ValidationMessage.SignInSuccess, {
            appearance: "success",
            autoDismiss: true,
          });
          navigate(ROUTES.FORM);
        } else {
          setShowLoader(false);
          addToast(ValidationMessage.InvalidCredentials, {
            appearance: "error",
            autoDismiss: true,
          });
          return;
        }
      })
      .catch((err) => {
        setShowLoader(false);
        switch (err?.response?.status) {
          case StatusCode.Forbidden:
            addToast(ValidationMessage.InactiveUser, {
              appearance: "error",
              autoDismiss: true,
            });
            break;

          case StatusCode.Unauthorized:
            addToast(ValidationMessage.InvalidCredentials, {
              appearance: "error",
              autoDismiss: true,
            });
            break;
          default:
            addToast(ValidationMessage.SomethingWentWrong, {
              appearance: "error",
              autoDismiss: true,
            });
            break;
        }
      });
  };

  const handleSignUp = (values: FormikValues) => {
    const payload = {
      name: values.name,
      mobile_number: values.mobile_number,
      password: values.password,
    };
    setShowLoader(true);
    AuthService.signUp(payload)
      .then((response) => {
        if (!response.data || !response.data.success) {
          addToast(ValidationMessage.SomethingWentWrong, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        if (response.data.success) {
          addToast(response.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          handleSignIn(values);
        }
        setShowLoader(false);
      })
      .catch((err) => {
        setShowLoader(false);
        addToast(ValidationMessage.SomethingWentWrong, {
          appearance: "error",
          autoDismiss: true,
        });
      });
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
                name: "",
                mobile_number: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}
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
                  <h1 className="title" style={{ color: "white" }}>
                    Register
                  </h1>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    color="success"
                    sx={{ pb: "20px" }}
                    error={!!(errors.name && touched.name)}
                  >
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        color: "success",
                        style: {
                          color: "white",
                        },
                        form: {
                          autocomplete: "off",
                        },
                      }}
                      label="Name"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="name" />
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    color="success"
                    sx={{ pb: "20px" }}
                    error={!!(errors.mobile_number && touched.mobile_number)}
                  >
                    <InputLabel htmlFor="mobile_number">
                      Mobile Number
                    </InputLabel>
                    <OutlinedInput
                      name="mobile_number"
                      type="text"
                      value={values.mobile_number}
                      onChange={handleChange}
                      inputProps={{
                        color: "success",
                        style: {
                          color: "white",
                        },
                        form: {
                          autocomplete: "off",
                        },
                      }}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <Avatar src={images.UserIC} title="User" />
                        </InputAdornment>
                      }
                      label="Mobile Number"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="mobile_number" />
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    color="success"
                    sx={{ pb: "12px" }}
                    error={!!(errors.password && touched.password)}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        color: "success",
                        style: {
                          color: "white",
                        },
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Avatar
                              src={
                                !showPassword
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
                    color="success"
                    sx={{ pb: "12px" }}
                    error={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                  >
                    <InputLabel htmlFor="confirmPassword">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        color: "success",
                        style: {
                          color: "white",
                        },
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            <Avatar
                              src={
                                !showConfirmPassword
                                  ? images.ShowPasswordIC
                                  : images.HidePasswordIC
                              }
                              title={
                                showConfirmPassword
                                  ? "Show Password"
                                  : "Hide Password"
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
                    className="custom-bg-green"
                    fullWidth
                    title="confirmPassword"
                    disabled={showLoader}
                  >
                    {showLoader ? (
                      <>
                        Loading{" "}
                        <CircularProgress
                          className="apply-btn-loader"
                          size={"small"}
                        />
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                  <div
                    style={{
                      color: "WHITE",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    Already Registered? &nbsp;
                    <Link
                      to="/"
                      style={{ color: "#008264", textAlign: "center" }}
                    >
                      Login here
                    </Link>
                  </div>
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
