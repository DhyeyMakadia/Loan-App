import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";
import FormService from "services/form";
import Loader from "components/Loader";
import { useCallback, useState } from "react";
import BankDetails from "components/BankDetails";
import PersonalDetails from "components/PersonalDetails";
import LoanDetails from "components/LoanDetails";
import LoanSuccess from "components/LoanSuccess";
import { Steps } from "shared/constants";

type UserDetails = {
  user_id: number;
  amount: number;
  disbursal: number;
  interest: number;
  repayment: number;
  service_charge: number;
  received_amount: number;
  gst: number;
  month: number;
  aadhaar_number: number;
  pan_number: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  birth_date: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  monthly_income: string;
  profession: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
};

export default function Checkout() {
  const navigate = useNavigate();
  const token = Cookies.get("auth_token");
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [loanTerm, setLoanTerm] = useState<number>(6);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<UserDetails>();

  const [steps, setSteps] = useState(Steps.PersonalDetails);

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

  const handleLoanDetailsSubmit = async () => {
    const payload = {
      user_id: Number(Cookies.get("user_id")),
      amount: loanAmount,
      month: loanTerm,
      disbursal: loanAmount,
      interest: calculateInterest(),
      repayment: calculateRepayment(),
      service_charge: calculateServiceCharge(),
      received_amount: calculateRepayment(),
      gst: calculateGST(),
      aadhaar_number: userDetails!.aadhaar_number,
      pan_number: userDetails!.pan_number,
      first_name: userDetails!.first_name,
      last_name: userDetails!.last_name,
      email: userDetails!.email,
      mobile_number: userDetails!.mobile_number,
      birth_date: userDetails!.birth_date,
      gender: userDetails!.gender,
      address: userDetails!.address,
      city: userDetails!.city,
      state: userDetails!.state,
      country: userDetails!.country,
      pincode: userDetails!.pincode,
      monthly_income: userDetails!.monthly_income,
      profession: userDetails!.profession,
      bank_name: userDetails!.bank_name,
      account_holder_name: userDetails!.account_holder_name,
      account_number: userDetails!.account_number,
      ifsc_code: userDetails!.ifsc_code,
    };
    setShowLoader(true);
    await FormService.AddForm(payload);
    setTimeout(() => {
      setSteps(Steps.LoanSuccess);
      setShowLoader(false);
    }, 15000);
  };

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("user_id");
    window.location.reload();
  };

  const GetLoanDetails = () => {
    const id = Number(Cookies.get("user_id"));
    FormService.GetLoanAmount(id)
      .then((res) => {
        setShowLoader(false);
        if (res.data.data) {
          setSteps(Steps.LoanSuccess);
          setLoanAmount(Number(res.data.data.amount.split(".")[0]));
          setLoanTerm(res.data.data.month);
        }
      })
      .catch(() => {
        setShowLoader(false);
      });
  };

  React.useEffect(() => {
    if (!token) {
      navigate(ROUTES.LOGIN);
    }
    GetLoanDetails();
    // eslint-disable-next-line
  }, []);

  const GetData = useCallback(() => {
    switch (steps) {
      case Steps.PersonalDetails:
        return (
          <PersonalDetails
            setUserDetails={setUserDetails}
            setSteps={setSteps}
            setShowLoader={setShowLoader}
          />
        );
      case Steps.BankDetails:
        return (
          <BankDetails
            setUserDetails={setUserDetails}
            setSteps={setSteps}
            setShowLoader={setShowLoader}
          />
        );
      case Steps.LoanDetails:
        return (
          <LoanDetails
            loanAmount={loanAmount}
            loanTerm={loanTerm}
            gst={calculateGST()}
            interest={calculateInterest()}
            repayment={calculateRepayment()}
            serviceCharge={calculateServiceCharge()}
            setLoanAmount={setLoanAmount}
            setLoanTerm={setLoanTerm}
            handleNext={handleLoanDetailsSubmit}
          />
        );
      case Steps.LoanSuccess:
        return (
          <LoanSuccess
            loanAmount={loanAmount}
            loanTerm={loanTerm}
            gst={calculateGST()}
            interest={calculateInterest()}
            repayment={calculateRepayment()}
            serviceCharge={calculateServiceCharge()}
          />
        );
      default:
        return <></>;
    }
  }, [steps, loanAmount, loanTerm]);

  if (!token) {
    return <></>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {showLoader && <Loader />}
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
      {GetData()}
    </React.Fragment>
  );
}
