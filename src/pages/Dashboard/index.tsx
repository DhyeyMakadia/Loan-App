import React, { useEffect } from "react";
import "../../styles/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";

const Dashboard = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    document.body.classList.add("white")
    return () => {
      document.body.classList.remove("white")
    }
  }, [])
  
  return (
    <React.Fragment>
      <div className="home">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link to={ROUTES.HOME}>
                <a className="navbar-brand justify-content-start custom-text-color">
                  Loan Manager
                </a>
              </Link>
              <div className="justify-content-end" id="navbarNav">
                <button
                  className="btn custom-btn custom-btn-text"
                  onClick={redirectToLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </nav>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <img src="img/banner.jpg" alt="" height="100%" width="100%" />
            </div>
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col-md-12">
              <h3>Loan Guide - Apply for an Instant Personal Loan Online</h3>
            </div>
            <div className="col-md-12 custom-text-color-grey">
              Manage all of life’s instant upgrades with Online Loan Guide
              from Fibe. Get up to ₹5 lakh in just 2 minutes.
            </div>
          </div>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-12 justify-content-start">
              <button
                className="btn custom-btn custom-btn-text"
                onClick={redirectToLogin}
              >
                Apply Now
              </button>
            </div>
          </div>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-12 custom-text-color-grey">
              Already have an account?{" "}
              <span
                className="custom-text-color"
                style={{ cursor: "pointer" }}
                onClick={redirectToLogin}
              >
                Login
              </span>
            </div>
          </div>
          <div
            className="row"
            style={{ backgroundColor: "#fff4f0", marginTop: "50px" }}
          >
            <div className="row p-10">
              <div className="col-md-6 p-10 d-flex align-items-center justify-content-center">
                <img
                  src="img/icon-1.png"
                  className="icon-image"
                  style={{ marginRight: "10px" }}
                  alt=""
                />
                <div className="ml-3">
                  <span>1.5M+</span>
                  <br />
                  <span className="custom-text-color-grey">App Downloads</span>
                </div>
              </div>
              <div className="col-md-6 p-10 d-flex align-items-center justify-content-center">
                <img
                  src="img/icon-2.png"
                  className="icon-image"
                  style={{ marginRight: "10px" }}
                  alt=""
                />
                <div className="ml-3">
                  <span>5.5M+</span>
                  <br />
                  <span className="custom-text-color-grey">
                    Loand Given &nbsp; &nbsp; &nbsp;
                  </span>
                </div>
              </div>
              <div className="col-md-6 p-10 d-flex align-items-center justify-content-center">
                <img
                  src="img/icon-3.png"
                  className="icon-image"
                  style={{ marginRight: "10px" }}
                  alt=""
                />
                <div className="ml-3">
                  <span>&#x20B9;15000+ Crores</span>
                  <br />
                  <span className="custom-text-color-grey">
                    Money Disbursed
                  </span>
                </div>
              </div>
              <div className="col-md-6 p-10 d-flex align-items-center justify-content-center">
                <img
                  src="img/icon-4.png"
                  className="icon-image"
                  style={{ marginRight: "10px" }}
                  alt=""
                />
                <div className="ml-3">
                  <span>20 Lacs+</span>
                  <br />
                  <span className="custom-text-color-grey">Happy Customer</span>
                </div>
              </div>
              <div className="col-md-6 p-10 d-flex align-items-center justify-content-center">
                <img
                  src="img/icon-5.png"
                  className="icon-image"
                  style={{ marginRight: "10px" }}
                  alt=""
                />
                <div className="ml-3">
                  <span>5,000+</span>
                  <br />
                  <span className="custom-text-color-grey">
                    Corporate Tieups
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col-md-12 text-center mt-10">
              <h3>Apply for a Personal Loan for All Your Needs</h3>
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              Whether it’s a last-minute travel plan or a medical emergency – an
              online personal loan is an easy solution to all your financial
              needs. You can apply for a personal loan online without submitting
              physical paperwork. With over five lakh happy customers, Fibe is
              emerging as one of the top platforms for getting instant Personal
              loans with a simple and safe application process.
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              Fibe is one of India’s trusted digital lending platforms where you
              can apply for instant loan, get approval instantly and money will
              be disbursed within 2 minutes. Just check the eligibility
              criteria, credit limit on the Fibe app and get the cash credited
              to your bank account directly. With Fibe, you get benefits like
              quick disbursal, flexible tenure, minimal documentation and
              attractive interest rates.
            </div>
          </div>
          <div
            className="row"
            style={{ marginTop: "50px", backgroundColor: "#f9fafc" }}
          >
            <div className="col-md-12 text-center mt-10">
              <h3>Personal Loan Eligibility Criteria</h3>
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              Fibe offers the best personal loans with easy-to-meet eligibility
              criteria. Unlike other banks or non-bank financial corporations,
              in Fibe, you can apply for instant personal loan online with
              minimal documentation
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              Fibe is India’s trusted platform for seamless and secure loans.
              Applying for instant personal loans by logging into our official
              website or download the application.
            </div>
            <div className="col-md-12 mt-10">
              <div className="card mx-auto">
                <div className="card-body">
                  <img src="img/1.jpg" alt="" className="round-image" /> Age:
                  Between 21 and 55 years
                </div>
              </div>
              <div className="card mx-auto">
                <div className="card-body">
                  <img src="img/2.jpg" alt="" className="round-image" />{" "}
                  <span>
                    Metro cities: Minimum salary - ₹18,000 Non-metro cities:
                    Minimum salary - ₹15,000
                  </span>
                </div>
              </div>
              <div className="card mx-auto" style={{ marginBottom: "30px" }}>
                <div className="card-body">
                  <img src="img/3.jpg" alt="" className="round-image" />{" "}
                  Residence: Must be a resident of India
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col-md-12 text-center mt-10">
              <h3>Documents Required for a Personal Loan</h3>
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              The quick online loan application process from Fibe is super easy
              and quick. The best part? You get a loan in 2 minutes. The
              documents required for a personal loan depend on one lender to
              another.
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              At Fibe, get easy personal loan by just uploading some basic
              documents as mentioned on the right.
            </div>
            <div className="col-md-12 custom-text-color-grey text-center mt-10">
              Get your instant personal loan now!
            </div>
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <div className="col-md-12">
              <ul className="custom-bullet">
                <li>
                  A Selfie
                  <br />
                  <span className="custom-text-color-grey">
                    Age: Between 21 and 55 years
                  </span>
                </li>
                <li>
                  Identity Proof
                  <br />
                  <span className="custom-text-color-grey">
                    Passport/Aadhaar card/PAN card/driver's license
                  </span>
                </li>
                <li>
                  Address Proof
                  <br />
                  <span className="custom-text-color-grey">
                    Passport/a rental agreement/utility bills/voter’s ID
                  </span>
                </li>
                <li>
                  Proof of Income
                  <br />
                  <span className="custom-text-color-grey">
                    Bank statements and salary stubs for the last 3 to 6 months
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
