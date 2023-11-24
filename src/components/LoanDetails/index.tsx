import React, { FC, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  FormControl,
  Slider,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
} from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { LoanAmountMarks } from "shared/constants";

type Props = {
  loanAmount: number;
  loanTerm: number;
  serviceCharge: number;
  interest: number;
  repayment: number;
  gst: number;
  setLoanAmount: (x: number) => void;
  setLoanTerm: (x: number) => void;
  handleNext: () => void;
};

const LoanDetails: FC<Props> = ({
  loanAmount,
  loanTerm,
  gst,
  interest,
  repayment,
  serviceCharge,
  setLoanAmount,
  setLoanTerm,
  handleNext,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialValues = {
    slider: loanAmount,
    term: loanTerm,
  };

  const handleSubmit = (values: FormikValues) => {
    setIsSubmitting(true);
    handleNext();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => {
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
                  Loan Details
                </Typography>

                {/* <Grid container spacing={3} paddingTop={3}>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                fullWidth
                color="success"
                sx={{ pb: "20px" }}
              >
                <InputLabel htmlFor="aadhaar_number">
                  Aadhaar Number
                </InputLabel>
                <OutlinedInput
                  name="aadhaar_number"
                  type="number"
                  value={aadhaarNumber}
                  inputProps={{
                    color: "success",
                    style: {
                      color: "white",
                    },
                    form: {
                      autocomplete: "off",
                    },
                  }}
                  label="Aadhaar Number"
                  onChange={handleAadhaarChange}
                />
                {aadhaarNumberError && (
                  <FormHelperText error className="custom-error">
                    Aadhaar Number is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                fullWidth
                color="success"
                sx={{ pb: "20px" }}
              >
                <InputLabel htmlFor="pan_number">Pan Number</InputLabel>
                <OutlinedInput
                  name="pan_number"
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
                  value={panNumber}
                  label="Pan Number"
                  onChange={handlePanChange}
                />
                {panNumberError && (
                  <FormHelperText error className="custom-error">
                    Pan Number is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid> */}
                <Typography
                  variant="h6"
                  gutterBottom
                  marginTop={"15px"}
                  marginBottom={0}
                  fontSize="14px"
                  className="custom-color"
                >
                  Loan Amount: <b style={{ fontSize: "16px" }}>₹ </b>
                  {loanAmount}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      sx={{ pb: "20px" }}
                    >
                      <Slider
                        min={50000}
                        max={200000}
                        name="slider"
                        value={loanAmount}
                        onChange={(e, value) => {
                          setFieldValue("slider", value);
                          setLoanAmount(Number(value));
                        }}
                        step={null}
                        marks={LoanAmountMarks}
                        className="custom-color"
                        classes={{ markLabel: "custom-color" }}
                        aria-label="Range"
                        valueLabelDisplay="auto"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        style={{ fontSize: "14px" }}
                        className="custom-color"
                      >
                        Loan Term
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="term"
                        onChange={(e, value) => {
                          setFieldValue("term", value);
                          setLoanTerm(Number(value));
                        }}
                        value={values.term}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={3}>
                            <FormControlLabel
                              value={6}
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: "#008264",
                                    "&.Mui-checked": {
                                      color: "#008264",
                                    },
                                  }}
                                />
                              }
                              className="custom-radio"
                              label="6 Months"
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <FormControlLabel
                              value={12}
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: "#008264",
                                    "&.Mui-checked": {
                                      color: "#008264",
                                    },
                                  }}
                                />
                              }
                              className="custom-radio"
                              label="12 Months"
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <FormControlLabel
                              value={24}
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: "#008264",
                                    "&.Mui-checked": {
                                      color: "#008264",
                                    },
                                  }}
                                />
                              }
                              className="custom-radio"
                              label="24 Months"
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <FormControlLabel
                              value={36}
                              control={
                                <Radio
                                  size="small"
                                  sx={{
                                    color: "#008264",
                                    "&.Mui-checked": {
                                      color: "#008264",
                                    },
                                  }}
                                />
                              }
                              className="custom-radio"
                              label="36 Months"
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                variant="outlined"
                className="card"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1" component="span">
                        Disbursal
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{ float: "right" }}
                      >
                        <b style={{ fontSize: "16px" }}>₹ </b>
                        {loanAmount}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1" component="span">
                        Interest
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{ float: "right" }}
                      >
                        <b style={{ fontSize: "16px" }}>₹ </b> {interest}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1" component="span">
                        Repayment{`(-${serviceCharge})`}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{ float: "right" }}
                      >
                        <b style={{ fontSize: "16px" }}>₹ </b> {repayment}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="body1" component="span">
                        Service Charge
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{ float: "right" }}
                      >
                        <b style={{ fontSize: "16px" }}>₹ </b>
                        {serviceCharge}
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              </Paper>
              <Button
                type="submit"
                variant="contained"
                className="custom-bg-green"
                style={{ float: "right" }}
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Loading{" "}
                    <CircularProgress
                      className="apply-btn-loader"
                      size={"small"}
                    />
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoanDetails;
