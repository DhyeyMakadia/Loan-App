import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Icon,
  InputLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";
import FormService from "services/form";

const marks = [
  {
    value: 50000,
    label: "50000",
  },
  {
    value: 100000,
    label: "100000",
  },
  {
    value: 150000,
    label: "150000",
  },
  {
    value: 200000,
    label: "200000",
  },
];

export default function Checkout() {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = React.useState<number>(50000);
  const [loanTerm, setLoanTerm] = React.useState<number>(6);
  const [applyNow, setApplyNow] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const handleAmountChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setLoanAmount(newValue);
    }
  };

  const calculateServiceCharge = React.useCallback(() => {
    switch (loanAmount) {
      case 50000:
        return 754;
      case 100000:
        return 1045;
      case 150000:
        return 1545;
      case 200000:
        return 1945;
      default:
        return 0;
    }
  }, [loanAmount]);

  const calculateInterest = React.useCallback(() => {
    function term() {
      switch (loanTerm) {
        case 6:
          return 0;
        case 12:
          return 1;
        case 24:
          return 2;
        case 36:
          return 3;
        default:
          return 0;
      }
    }

    switch (loanAmount) {
      case 50000:
        return 2000 + 1000 * term();
      case 100000:
        return 3000 + 1000 * term();
      case 150000:
        return 6000 + 1000 * term();
      case 200000:
        return 9000 + 1000 * term();

      default:
        return 2000 + 1000 * term();
    }
  }, [loanAmount, loanTerm]);

  const calculateRepayment = React.useCallback(() => {
    return loanAmount + calculateInterest() - calculateServiceCharge();
  }, [loanAmount, calculateInterest, calculateServiceCharge]);

  const calculateGST = React.useCallback(() => {
    return (loanAmount * 18) / 100;
  }, [loanAmount]);

  const handleLoanTerm = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setLoanTerm(Number(value));
  };

  const handleApplyNow = async () => {
    const payload = {
      user_id: 1, // TODO
      amount: loanAmount,
      disbursal: loanAmount,
      interest: calculateInterest(),
      repayment: calculateRepayment(),
      service_charge: calculateServiceCharge(),
      received_amount: calculateRepayment(),
      gst: calculateGST(),
    };
    setApplyNow(true);
    await FormService.AddForm(payload);
    setTimeout(() => {
      setIsSuccess(true);
      setApplyNow(false);
    }, 30000);
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handlePayNow = () => {
    console.log("done");
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    window.location.reload();
  };

  React.useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      navigate(ROUTES.LOGIN);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        className="custom-bg"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit" noWrap>
            Loan Manager
          </Typography>
          <Typography variant="h6" color="inherit" noWrap>
            <div style={{ cursor: "pointer" }} onClick={handleLogout}>
              <PowerSettingsNewIcon style={{ verticalAlign: "middle" }} />
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      {!isSuccess ? (
        <Container component="main" maxWidth="lg" sx={{ mb: 12 }}>
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

            <React.Fragment>
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
                  <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                    <Slider
                      min={50000}
                      max={200000}
                      value={loanAmount}
                      onChange={handleAmountChange}
                      step={null}
                      marks={marks}
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
                      name="row-radio-buttons-group"
                      onChange={handleLoanTerm}
                      value={loanTerm}
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
                    Disbursal
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    style={{ float: "right" }}
                  >
                    <b style={{ fontSize: "16px" }}>₹ </b>12000
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
                    <b style={{ fontSize: "16px" }}>₹ </b> {calculateInterest()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1" component="span">
                    Repayment{`(-${calculateServiceCharge()})`}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    style={{ float: "right" }}
                  >
                    <b style={{ fontSize: "16px" }}>₹ </b>{" "}
                    {calculateRepayment()}
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
                    {calculateServiceCharge()}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
          <Button
            type="button"
            variant="contained"
            className="custom-bg-green"
            style={{ float: "right" }}
            fullWidth
            onClick={handleApplyNow}
            disabled={applyNow}
          >
            {applyNow ? (
              <>
                Loading{" "}
                <CircularProgress className="apply-btn-loader" size={"small"} />
              </>
            ) : (
              "Apply Now"
            )}
          </Button>
        </Container>
      ) : (
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
                    {calculateRepayment()}
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
                    {calculateRepayment()} / {loanTerm} Months
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
                    <b style={{ fontSize: "16px" }}>₹ </b> {calculateInterest()}
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
                    <b style={{ fontSize: "16px" }}>₹ </b>{" "}
                    {calculateRepayment()}
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
                    <b style={{ fontSize: "16px" }}>₹ </b>{" "}
                    {calculateRepayment()}
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
                    {calculateGST()}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
          <Typography variant="body1" component="b" style={{ color: "white" }}>
            <Checkbox
              checked={checked}
              onChange={handleTermsChange}
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
            type="button"
            variant="contained"
            className="custom-bg-green"
            style={{ float: "right" }}
            fullWidth
            onClick={handlePayNow}
            disabled={!checked}
          >
            Pay Now
          </Button>
        </Container>
      )}
    </React.Fragment>
  );
}
