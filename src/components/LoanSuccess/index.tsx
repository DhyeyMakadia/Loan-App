import React, { FC, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import PaymentModal from "components/PaymentModal";

type Props = {
  loanAmount: number;
  loanTerm: number;
  repayment: number;
  interest: number;
  gst: number;
  serviceCharge: number;
};

const LoanSuccess: FC<Props> = ({
  gst,
  interest,
  loanAmount,
  loanTerm,
  repayment,
  serviceCharge,
}) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  const initialValues = {
    agreeTerms: false,
  };

  const handleSubmit = (values: FormikValues) => {
    if (values.agreeTerms) {
      setPaymentModalOpen(true);
    }
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <Container component="main" maxWidth="lg" sx={{ mb: 12 }}>
              <Paper
                variant="outlined"
                className="card"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="body1"
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: "28px",
                        }}
                      >
                        Congratulations !!
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ color: "#dbdbdb", textAlign: "center" }}
                      >
                        New loan Eligibility has been
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: "24px", textAlign: "center" }}
                      >
                        <b style={{ fontSize: "24px" }}>₹ </b>
                        {repayment}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ color: "#adabab", textAlign: "center" }}
                      >
                        As per security tax rule, you get 18% GST need to cut
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              </Paper>
              <Paper
                variant="outlined"
                className="card"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <React.Fragment>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="body1"
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        Your loan options
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: "24px", textAlign: "center" }}
                      >
                        <b style={{ fontSize: "24px" }}>₹ </b>
                        {repayment} / {loanTerm} Months
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
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
                        Repayment
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
                        Received Amount
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
                        GST
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        style={{ float: "right" }}
                      >
                        <b style={{ fontSize: "16px" }}>₹ </b>
                        {gst}
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              </Paper>
              <Typography
                variant="body1"
                component="b"
                style={{ color: "white" }}
              >
                <Checkbox
                  name="agreeTerms"
                  checked={values.agreeTerms}
                  onChange={handleChange}
                  sx={{
                    color: "#008264",
                    "&.Mui-checked": {
                      color: "#008264",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <b>
                  I agree{" "}
                  <a href="/#" className="custom-color">
                    Terms & Conditions
                  </a>
                </b>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                className="custom-bg-green"
                style={{ float: "right", marginBottom: "15px" }}
                fullWidth
                disabled={!values.agreeTerms}
              >
                Pay Now
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
      <PaymentModal
        isOpen={paymentModalOpen}
        money={serviceCharge}
        handleClose={() => setPaymentModalOpen(false)}
      />
    </>
  );
};

export default LoanSuccess;
