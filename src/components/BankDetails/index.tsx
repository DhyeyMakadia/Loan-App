import { FC } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { Formik, ErrorMessage, Form, FormikValues } from "formik";
import { preventNonNumericalInput } from "shared/utils/helperFunctions";
import * as Yup from "yup";
import { Steps } from "shared/constants";

type Props = {
  setUserDetails: (x: any) => void;
  setSteps: (x: number) => void;
  setShowLoader: (x: boolean) => void;
};

const BankDetails: FC<Props> = ({
  setUserDetails,
  setSteps,
  setShowLoader,
}) => {
  const schema = Yup.object({
    aadhaarNumber: Yup.string()
      .length(12, "Aadhaar Number must of 12 Characters")
      .matches(/^\d+$/, "Aadhaar Number must be digits only")
      .required("Aadhaar Number is Required"),
    panNumber: Yup.string().required("Pan Number is Required"),
    monthlyIncome: Yup.string()
      .matches(/^\d+$/, "Monthly Income must be digits only")
      .required("Monthly Income is Required"),
    profession: Yup.string().required("Profession is Required"),
    bankName: Yup.string().required("Bank Name is Required"),
    accountHolderName: Yup.string().required("Account Holder Name is Required"),
    accountNumber: Yup.string()
      .matches(/^\d+$/, "Account Number must be digits only")
      .required("Account Number is required"),
    confirmAccountNumber: Yup.string()
      .oneOf([Yup.ref("accountNumber")], "Account Number must match")
      .matches(/^\d+$/, "Account Number must be digits only")
      .required("Account Number is required"),
    ifsc: Yup.string().required("IFSC Code is required"),
  });

  const initialValues = {
    aadhaarNumber: null,
    panNumber: "",
    monthlyIncome: null,
    profession: "business",
    bankName: "",
    accountHolderName: "",
    accountNumber: null,
    confirmAccountNumber: null,
    ifsc: "",
  };

  const handleSubmit = (values: FormikValues) => {
    const payload = {
      aadhaar_number: values.aadhaarNumber,
      pan_number: values.panNumber,
      monthly_income: values.monthlyIncome,
      profession: values.profession,
      bank_name: values.bankName,
      account_holder_name: values.accountHolderName,
      account_number: values.accountNumber,
      ifsc_code: values.ifsc,
    };
    setUserDetails((data: any) => ({ ...payload, ...data }));
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setSteps(Steps.LoanDetails);
    }, 5000);
  };
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleBlur, handleChange, touched }) => {
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
                  Bank Details
                </Typography>

                <Grid container spacing={3} paddingTop={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.aadhaarNumber && !!touched.aadhaarNumber}
                    >
                      <InputLabel htmlFor="aadhaarNumber">
                        Aadhaar Number
                      </InputLabel>
                      <OutlinedInput
                        name="aadhaarNumber"
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
                        value={values.aadhaarNumber}
                        label="Aadhaar Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="aadhaarNumber" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.panNumber && !!touched.panNumber}
                    >
                      <InputLabel htmlFor="panNumber">Pan Number</InputLabel>
                      <OutlinedInput
                        name="panNumber"
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
                        value={values.panNumber}
                        label="Pan Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="panNumber" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.monthlyIncome && !!touched.monthlyIncome}
                    >
                      <InputLabel htmlFor="monthlyIncome">
                        Monthly Income
                      </InputLabel>
                      <OutlinedInput
                        name="monthlyIncome"
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
                        value={values.monthlyIncome}
                        label="Monthly Income"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="monthlyIncome" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.profession}
                    >
                      <FormLabel className="custom-color">
                        Select Profession
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="business"
                        name="profession"
                        onChange={handleChange}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <FormControlLabel
                              value="business"
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
                              label="Business"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel
                              value="job"
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
                              label="Job"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControlLabel
                              value="other"
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
                              label="Other"
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
                      error={!!errors.bankName && !!touched.bankName}
                    >
                      <InputLabel htmlFor="bankName">Bank Name</InputLabel>
                      <OutlinedInput
                        name="bankName"
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
                        value={values.bankName}
                        label="Bank Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="bankName" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={
                        !!errors.accountHolderName &&
                        !!touched.accountHolderName
                      }
                    >
                      <InputLabel htmlFor="accountHolderName">
                        Account Holder Name
                      </InputLabel>
                      <OutlinedInput
                        name="accountHolderName"
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
                        value={values.accountHolderName}
                        label="Account Holder Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="accountHolderName" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.accountNumber && !!touched.accountNumber}
                    >
                      <InputLabel htmlFor="accountNumber">
                        Account Number
                      </InputLabel>
                      <OutlinedInput
                        name="accountNumber"
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
                        value={values.accountNumber}
                        label="Account Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="accountNumber" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={
                        !!errors.confirmAccountNumber &&
                        !!touched.confirmAccountNumber
                      }
                    >
                      <InputLabel htmlFor="confirmAccountNumber">
                        Confirm Account Number
                      </InputLabel>
                      <OutlinedInput
                        name="confirmAccountNumber"
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
                        value={values.confirmAccountNumber}
                        label="Confirm Account Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={(e) => preventNonNumericalInput(e)}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="confirmAccountNumber" />
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      color="success"
                      sx={{ pb: "20px" }}
                      error={!!errors.ifsc && !!touched.ifsc}
                    >
                      <InputLabel htmlFor="ifsc">IFSC</InputLabel>
                      <OutlinedInput
                        name="ifsc"
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
                        value={values.ifsc}
                        label="IFSC"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText error className="custom-error">
                        <ErrorMessage name="ifsc" />
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

export default BankDetails;
