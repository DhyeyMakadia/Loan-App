import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
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
// import { StatusCode } from "shared/constants";
import { useToasts } from "react-toast-notifications";
import { Helmet } from "react-helmet-async";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { StatusCode } from "shared/constants";
import { ROUTES } from "shared/constants/routes";

const LoginPage = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    mobile_number: Yup.string().required(ValidationMessage.MobileRequired),
    // password: Yup.string().required(ValidationMessage.PasswordRequired),
  });

  const handleSignIn = (values: FormikValues) => {
    const payload = {
      mobile_number: values.mobile_number,
      // password: values.password,
    };
    setShowLoader(true);
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
                mobile_number: "",
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
                  <h1 className="title" style={{ color: "white" }}>
                    Login
                  </h1>
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
                      inputProps={{
                        color: "success",
                        style: {
                          color: "white",
                        },
                        form: {
                          autocomplete: "off",
                        },
                      }}
                      value={values.mobile_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <Avatar
                            src={images.UserIC}
                            title="User"
                            style={{ color: "black" }}
                          />
                        </InputAdornment>
                      }
                      label="Mobile Number"
                    />
                    <FormHelperText error>
                      <ErrorMessage name="mobile_number" />
                    </FormHelperText>
                  </FormControl>
                  {/* <FormControl
                    variant="outlined"
                    fullWidth
                    color="success"
                    sx={{ pb: "12px" }}
                    error={!!(errors.password && touched.password)}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      name="password"
                      type={!showPassword ? "password" : "text"}
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
                                !showPassword
                                  ? "Show Password"
                                  : "Hide Password"
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
                  </FormControl> */}
                  <Button
                    variant="contained"
                    type="submit"
                    className="custom-bg-green"
                    fullWidth
                    title="Login"
                    disabled={showLoader}
                  >
                    {showLoader ? (
                      <>
                        Logging in{" "}
                        <CircularProgress
                          className="apply-btn-loader"
                          size={"small"}
                        />
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  {/* <div
                    style={{
                      color: "WHITE",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    Don't have a account? &nbsp;
                    <Link
                      to="/register"
                      style={{ color: "#008264", textAlign: "center" }}
                    >
                      Create now
                    </Link>
                  </div> */}
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
