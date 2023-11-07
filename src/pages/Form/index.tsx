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
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl, InputLabel } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 12 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Form
          </Typography>

          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="firstName"
                    label="First name"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="lastName"
                    label="Last name"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="address1">address1</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="address1"
                    label="address1"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="address2">address2</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="address2"
                    label="address2"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="city">city</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="city"
                    label="city"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="state">state</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="state"
                    label="state"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="zip">zip</InputLabel>
                  <OutlinedInput type="text" name="zip" label="zip" fullWidth />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth sx={{ pb: "20px" }}>
                  <InputLabel htmlFor="country">country</InputLabel>
                  <OutlinedInput
                    type="text"
                    name="country"
                    label="country"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
            </Box>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
