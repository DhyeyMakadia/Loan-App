import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { QRCode } from "react-qrcode-logo";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UpiDetailsData } from "services/form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  "@media (max-width: 500px)": {
    width: 300,
  },
  bgcolor: "#4c4c4c !important",
  border: "2px solid #008264",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

type Props = {
  isOpen: boolean;
  money: number;
  handleClose: () => void;
  upiDetails: UpiDetailsData;
};

const PaymentModal: FC<Props> = ({
  isOpen,
  money,
  handleClose,
  upiDetails,
}) => {
  const isMobileView = useMediaQuery("(max-width:500px)");
  const handlePayment = (mode: string) => {
    const transactionNote = "LoanFees";
    let url = `pay?pa=${upiDetails?.upi_id}&pn=${upiDetails?.merchant_name}&tn=${transactionNote}&am=${money}`;
    switch (mode) {
      case "PayTM":
        url = "paytmmp://" + url;
        break;
      case "PhonePe":
        url = "phonepe://" + url;
        break;
      case "GooglePay":
        url = "tez://upi/" + url;
        break;
      default:
        url = "upi://" + url;
        break;
    }
    const newWindow = window.open(url, "", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <div>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <p className="text-white" style={{ marginBottom: "10px" }}>
                Scan the QR code or click the button to make the payment
              </p>
              <QRCode
                value={`upi://pay?pa=${upiDetails?.upi_id}&pn=${upiDetails?.merchant_name}&tn=LoanFees&am=${money}`}
                size={isMobileView ? 150 : 200}
                // logoImage="https://i.postimg.cc/5tdHfkxF/118852864-1241633666213183-4722008391193475906-n.png"
                // logoWidth={80}
                // logoHeight={100}
                // logoOpacity={0.6}
              />
            </div>
            <Button
              variant="contained"
              size="large"
              fullWidth
              className="custom-bg-green"
              style={{ marginBottom: "10px" }}
              onClick={() => handlePayment("GooglePay")}
            >
              Google Pay
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              className="custom-bg-green"
              style={{ marginBottom: "10px" }}
              onClick={() => handlePayment("PhonePe")}
            >
              Phone Pe
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              className="custom-bg-green"
              style={{ marginBottom: "10px" }}
              onClick={() => handlePayment("PayTM")}
            >
              PayTM
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
