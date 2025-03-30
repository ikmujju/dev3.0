import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import QRCode from "react-qr-code";
import "./upi.css" // Import the CSS file

export default function UpiPayment() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount") || "0"; // Get amount from URL
  const upiId = "khalifamujahid365@okhdfcbank";
  const name = "Mujju";
  const currency = "INR";
  const aid = "uGICAgMDyvtypYg";
  
  const [showQR, setShowQR] = useState(false);

  const upiURL = `upi://pay?pa=${upiId}&pn=${name}&mc=&tid=&tr=&tn=Payment&am=${amount}&cu=${currency}&aid=${aid}`;

  const handlePayment = () => {
    setShowQR(true);
    toast.success("QR Code Generated!");
  };

  return (
    <div className="upi-container">
      <div className="upi-box">
        <h2 className="upi-title">UPI Payment</h2>
        <p className="upi-amount">Amount: ₹{amount}</p>
        <button onClick={handlePayment} className="upi-btn">
          Generate QR Code
        </button>
        {showQR && (
          <div className="qr-container">
            <QRCode value={upiURL} size={200} />
          </div>
        )}
      </div>
    </div>
  );
}
