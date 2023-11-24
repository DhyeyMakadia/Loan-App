import {
  Container,
  Paper,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { preventNonNumericalInput } from "shared/utils/helperFunctions";
import { FC } from "react";
import { Steps } from "shared/constants";

type Props = {
  setUserDetails: (x: any) => void;
  setSteps: (x: number) => void;
  setShowLoader: (x: boolean) => void;
};

const PersonalDetails: FC<Props> = ({
  setUserDetails,
  setSteps,
  setShowLoader,
}) => {
  const schema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    mobileNumber: Yup.string()
      .length(10, "Mobile Number must of 10 Characters")
      .matches(/^\d+$/, "Mobile Number must be digits only")
      .required("Mobile Number is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    birthDate: Yup.date().default(() => new Date("01-01-1990")),
    gender: Yup.string().default(() => "male"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: null,
    birthDate: null,
    gender: "male",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: null,
  };

  const handleSubmit = (values: FormikValues) => {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      mobile_number: values.mobileNumber,
      birth_date: values.birthDate,
      gender: values.gender,
      address: values.address,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.postalCode,
    };
    setUserDetails((data: any) => ({ ...payload, ...data }));
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setSteps(Steps.BankDetails);
    }, 2000);
  };
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        touched,
        setFieldValue,
      }) => {
        return (
          <Form>
            <Container
              className="login-main"
              component="main"
              maxWidth="lg"
              sx={{ mb: 12 }}
            >
              <Paper
                variant="outlined"
                className="card"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  align="center"
                  className="custom-color"
                >
                  Personal Details
                </Typography>

                <Grid container spacing={3} paddingTop={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.firstName && !!touched.firstName}
                    >
                      <InputLabel htmlFor="firstName">First Name</InputLabel>
                      <OutlinedInput
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        inputProps={{
                          color: "success",
                          style: {
                            color: "white",
                          },
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        label="First Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="firstName" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.lastName && !!touched.lastName}
                    >
                      <InputLabel htmlFor="lastName">Last Name</InputLabel>
                      <OutlinedInput
                        name="lastName"
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
                        value={values.lastName}
                        label="Last Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="lastName" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.email && !!touched.email}
                    >
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <OutlinedInput
                        name="email"
                        type="email"
                        value={values.email}
                        inputProps={{
                          color: "success",
                          style: {
                            color: "white",
                          },
                          form: {
                            autocomplete: "off",
                          },
                        }}
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="email" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.mobileNumber && !!touched.mobileNumber}
                    >
                      <InputLabel htmlFor="mobileNumber">
                        Mobile Number
                      </InputLabel>
                      <OutlinedInput
                        name="mobileNumber"
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
                        value={values.mobileNumber}
                        label="Mobile Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="mobileNumber" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.birthDate}
                        label="Birth Date"
                        onChange={(date) => {
                          setFieldValue("birthDate", date);
                        }}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            placeholder: "",
                            error: !!errors.birthDate && !!touched.birthDate,
                            inputProps: {
                              color: "success",
                              style: {
                                color: "white",
                              },
                            },
                            fullWidth: true,
                          },
                        }}
                        className="custom-datepicker nobottom-spacing"
                        // disabled={values.birthDate}
                        disableFuture
                      />
                    </LocalizationProvider>
                    <FormHelperText error>
                      <ErrorMessage name="birthDate" />
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.lastName}
                    >
                      <FormLabel className="custom-color">Gender</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="male"
                        name="gender"
                        onChange={handleChange}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <FormControlLabel
                              value="male"
                              control={
                                <Radio
                                  sx={{
                                    color: "#008264",
                                    "&.Mui-checked": {
                                      color: "#008264",
                                    },
                                  }}
                                />
                              }
                              label="Male"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormControlLabel
                              value="female"
                              control={
                                <Radio
                                  sx={{
                                    color: "#008264",
                                    "&.Mui-checked": {
                                      color: "#008264",
                                    },
                                  }}
                                />
                              }
                              label="Female"
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.address && !!touched.address}
                    >
                      <InputLabel htmlFor="address">Address</InputLabel>
                      <OutlinedInput
                        name="address"
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
                        value={values.address}
                        label="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="address" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.city && !!touched.city}
                    >
                      <InputLabel htmlFor="city">City</InputLabel>
                      <OutlinedInput
                        name="city"
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
                        value={values.city}
                        label="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="city" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.state && !!touched.state}
                    >
                      <InputLabel htmlFor="state">State</InputLabel>
                      <OutlinedInput
                        name="state"
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
                        value={values.state}
                        label="State"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="state" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.country && !!touched.country}
                    >
                      <InputLabel htmlFor="country">Country</InputLabel>
                      <OutlinedInput
                        name="country"
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
                        value={values.country}
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="country" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.postalCode && !!touched.postalCode}
                    >
                      <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
                      <OutlinedInput
                        name="postalCode"
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
                        value={values.postalCode}
                        label="Postal Code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="postalCode" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
              <Button
                type="submit"
                variant="contained"
                className="custom-bg-green"
                style={{ float: "right" }}
                fullWidth
              >
                Next
                {/* {isSubmitting ? (
                  <>
                    Loading{" "}
                    <CircularProgress
                      className="apply-btn-loader"
                      size={"small"}
                    />
                  </>
                ) : (
                  "Apply Now"
                )} */}
              </Button>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalDetails;
