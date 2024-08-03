import React from "react";
import styles from "./Wallet.module.css";
import DynamicTable from "../components/DynamicTable";

const data = [
  {
    id: "1",
    member_number: "SB10001",
    first_name: "Amara",
    last_name: "Jaward",
    payment_type: "CashApp",
    amount: "50",
    date: "7-22-2024",
    purpose: "registration",
    status: "paid",
  },
  {
    id: "2",
    member_number: "SB10001",
    first_name: "Amara",
    last_name: "Jaward",
    payment_type: "Zelle",
    amount: "100",
    date: "7-22-2024",
    purpose: "Contribution",
    status: "paid",
  },
  {
    id: "3",
    member_number: "SB10001",
    first_name: "Amara",
    last_name: "Jaward",
    payment_type: "Zelle",
    amount: "100",
    date: "7-22-2024",
    purpose: "Standing Fund",
    status: "paid",
  },
];

function Wallet() {
  const formattedContributions = data.map(
    ({
      // first_name,
      // last_name,
      member_number,
      payment_type,
      amount,
      date,
      purpose,
      status,
    }) => ({
      // first_name,
      // last_name,
      member_number,
      payment_type,
      amount,
      date,
      purpose,
      status,
    })
  );

  console.log(formattedContributions);

  return (
    <div className={styles.walletContainer}>
      <div>
        <h3>Wallet - My Contributtions</h3>
        <DynamicTable data={formattedContributions} />
      </div>
    </div>
  );
}

export default Wallet;
